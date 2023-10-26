import './Contact.scss';
import emailjs from '@emailjs/browser';
import { useRef, useEffect, useState, useCallback } from 'react';

export default function Contact() {
	const form = useRef(null);
	const map = useRef(null);
	const view = useRef(null);
	const instance = useRef(null);
	const [Traffic, setTraffic] = useState(false);
	const [Index, setIndex] = useState(0);
	const [IsMap, setIsMap] = useState(true);
	const { kakao } = window;
	const info = useRef([
		{
			title: '삼성역 코엑스',
			latlng: new kakao.maps.LatLng(37.51100661425726, 127.06162026853143),
			imgSrc: `${process.env.PUBLIC_URL}/img/marker1.png`,
			imgSize: new kakao.maps.Size(232, 99),
			imgPos: { offset: new kakao.maps.Point(116, 99) },
		},
		{
			title: '넥슨 본사',
			latlng: new kakao.maps.LatLng(37.40211707077346, 127.10344953763003),
			imgSrc: `${process.env.PUBLIC_URL}/img/marker2.png`,
			imgSize: new kakao.maps.Size(232, 99),
			imgPos: { offset: new kakao.maps.Point(116, 99) },
		},
		{
			title: '서울 시청',
			latlng: new kakao.maps.LatLng(37.5662952, 126.9779451),
			imgSrc: `${process.env.PUBLIC_URL}/img/marker3.png`,
			imgSize: new kakao.maps.Size(232, 99),
			imgPos: { offset: new kakao.maps.Point(116, 99) },
		},
	]);

	//지도위치를 중심으로 이동시키는 핸들러 함수 제작
	const setCenter = useCallback(() => {
		console.log('지도화면에서 마커 가운데 보정');
		// 지도 중심을 이동 시킵니다
		instance.current.setCenter(info.current[Index].latlng);
	}, [Index]);

	useEffect(() => {
		//위의 정보값을 활용한 마커 객체 생성
		const marker = new kakao.maps.Marker({
			position: info.current[Index].latlng,
			image: new kakao.maps.MarkerImage(
				info.current[Index].imgSrc,
				info.current[Index].imgSize,
				info.current[Index].imgPos
			),
		});

		map.current.innerHTML = '';

		instance.current = new kakao.maps.Map(map.current, {
			center: info.current[Index].latlng,
			level: 1,
		});

		marker.setMap(instance.current);

		const mapTypeControl = new kakao.maps.MapTypeControl();
		instance.current.addControl(
			mapTypeControl,
			kakao.maps.ControlPosition.BOTTOMLEFT
		);

		window.addEventListener('resize', setCenter);

		new kakao.maps.RoadviewClient().getNearestPanoId(
			info.current[Index].latlng,
			100,
			(panoId) => {
				new kakao.maps.Roadview(view.current).setPanoId(
					panoId,
					info.current[Index].latlng
				);
			}
		);

		return () => {
			window.removeEventListener('resize', setCenter);
		};
	}, [Index, kakao, setCenter]);

	useEffect(() => {
		Traffic
			? instance.current.addOverlayMapTypeId(kakao.maps.MapTypeId.TRAFFIC)
			: instance.current.removeOverlayMapTypeId(kakao.maps.MapTypeId.TRAFFIC);
	}, [Traffic, kakao]);

	const resetForm = () => {
		const nameForm = form.current.querySelector('.nameEl');
		const mailForm = form.current.querySelector('.emailEl');
		const msgForm = form.current.querySelector('.msgEl');
		nameForm.value = '';
		mailForm.value = '';
		msgForm.value = '';
	};

	const sendEmail = (e) => {
		e.preventDefault();

		const nameForm = form.current.querySelector('.nameEl');
		const mailForm = form.current.querySelector('.emailEl');
		const msgForm = form.current.querySelector('.msgEl');

		if (!nameForm.value || !mailForm.value || !msgForm.value)
			return alert('사용자이름, 이메일주소, 문의내용은 필수 입력사항입니다.');

		emailjs
			.sendForm(
				`${process.env.REACT_APP_SERVICE_ID}`,
				`${process.env.REACT_APP_TEMPLATE_ID}`,
				form.current,
				`${process.env.REACT_APP_PUBLIC_KEY}`
			)
			.then(
				(result) => {
					alert('문의내용이 메일로 발송되었습니다.');
					console.log(result);
					resetForm();
				},
				(error) => {
					alert('문의내용 전송에 실패했습니다.');
					console.log(error);
					resetForm();
				}
			);
	};

	return (
		<div className='Contact'>
			<div className='content1'>
				<div className='mapBox'>
					<div className='buttonBox'>
						<button onClick={() => setTraffic(!Traffic)}>
							{Traffic ? '교통정보 끄기' : '교통정보 켜기'}
						</button>

						<button onClick={setCenter}>지도 위치 초기화</button>
						<button onClick={() => setIsMap(!IsMap)}>
							{IsMap ? '로드뷰보기' : '지도보기'}
						</button>
					</div>

					<div className='container'>
						<div className={`view ${IsMap ? '' : 'on'}`} ref={view}></div>
						<div className={`map ${IsMap ? 'on' : ''}`} ref={map}></div>
					</div>

					{/* 데이터기반으로 자동 버튼 생성 및 자동 이벤트 연결 처리 */}
					<ul>
						{info.current.map((el, idx) => (
							<li
								className={Index === idx ? 'on' : ''}
								key={idx}
								onClick={() => {
									setIndex(idx);
									setIsMap(true);
								}}
							>
								{el.title}
							</li>
						))}
					</ul>
				</div>

				<div className='mailBox'>
					<form ref={form} onSubmit={sendEmail}>
						<div className='upper'>
							<span>
								<label>Name</label>
								<input type='text' name='user_name' className='nameEl' />
							</span>
						</div>
						<div>
							<span className='upperemail'>
								<label>Email</label>
								<input type='email' name='user_email' className='emailEl' />
							</span>
						</div>

						<div className='lower'>
							<label>Message</label>
							<textarea name='message' className='msgEl' />
						</div>

						<div className='btnSet'>
							<input type='reset' value='Cancel' />
							<input type='submit' value='Send' />
						</div>
					</form>
				</div>
			</div>
		</div>
	);
}
