// 1. 해당 페이지에서 이슈사항을 설명

import './Community.scss';
import { useRef, useState, useEffect } from 'react';

export default function Community() {
	const dummyData = useRef([
		{
			title: '"의사 수 확대는 필요조건" ‥ 얼마나 늘릴지는 …',
			content:
				'윤석열 대통령이 지역 의료, 필수 의료의 붕괴를 막기 위해서 의사 수를 늘리겠다는 입장을 분명히 했습니다.',
			data: new Date(),
		},
		{
			title: '유명 톱배우, 마약 투약의혹 내사 …',
			content:
				'유명 연예인이 마약 투약 의혹으로 경찰의 내사를 받고 있다고 알려졌다.',
			data: new Date(),
		},
		{
			title: '중고 제네시스를 신차급으로 뚝딱 …',
			content: '현대차, 인증중고차 24일부터 판다 5년 이내 10만㎞ 이하만.',
			data: new Date(),
		},
		{
			title: '마포 “강북의 노른자땅이 되겠어”… ',
			content:
				'서울시 ‘성산시영아파트 재건축 정비계획 및 정비구역 지정·경관심의(안)’ 수정 가결.',
			data: new Date(),
		},
	]);
	const getLocalData = () => {
		const data = localStorage.getItem('post');
		if (data) return JSON.parse(data);
		else return dummyData.current;
	};
	const refInput = useRef(null);
	const refTextarea = useRef(null);
	const refEditInput = useRef(null);
	const refEditTextarea = useRef(null);
	const [Posts, setPosts] = useState(getLocalData());
	const [Allowed, setAllowed] = useState(true);
	console.log(Posts);

	const resetForm = () => {
		refInput.current.value = '';
		refTextarea.current.value = '';
	};
	const createPost = () => {
		if (!refInput.current.value.trim() || !refTextarea.current.value.trim()) {
			resetForm();
			return alert('제목과 본문을 모두 입력하세요.');
		}
		//기존 Posts 배열값을 Deep copy해서 가져온뒤, 그 뒤에 추가로 방금 입력한 객체를 배열에 추가
		setPosts([
			{
				title: refInput.current.value,
				content: refTextarea.current.value,
				data: new Date(),
			},
			...Posts,
		]);
		resetForm();
	};

	const deletePost = (delIndex) => {
		if (window.confirm('정말 해당 게시글을 삭제하겠습니까?')) {
			//기존 Posts배열을 반복 돌면서 인수로 전달된 삭제 순번값과 현재 반복되는 배열의 순번값이 같지 않은 것만 리턴
			setPosts(Posts.filter((_, idx) => delIndex !== idx));
		}
	};

	//해당 글을 수정모드로 변경시키는 함수
	const enableUpdate = (editIndex) => {
		//수정모드 함수 호출시 Allowed가 true가 아니면 return으로 함수 강제 종료
		if (!Allowed) return;
		//일단 수정모드에 진입하면 강제로 Allowed값을 false로 변경해서 다른 글 수정모드 진입금지 처리
		setAllowed(false);
		setPosts(
			//Posts 배열값을 반복돌면서 인수로 전달된 수정할 포스트의 순번값과 현재 반복도는 배열의 포스트 순번값이 일치하면
			//해당 글을 수정처리해야되므로 해당 객체에 enableUpdate=true값을 추가
			Posts.map((post, idx) => {
				if (editIndex === idx) post.enableUpdate = true;
				return post;
			})
		);
	};

	//해당 글을 출력모드로 변경시키는 함수
	const disableUpdate = (editIndex) => {
		setAllowed(true);
		setPosts(
			Posts.map((post, idx) => {
				if (editIndex === idx) post.enableUpdate = false;
				return post;
			})
		);
	};

	//실제 글 수정하는 함수
	const updatePost = (updateIndex) => {
		//setPosts로 기존 Post배열같은 덮어쓰기해서 변경
		//리액트에서는 참조형 자료는 무조건 배열값을 Deep copy한뒤 변경
		setPosts(
			Posts.map((post, idx) => {
				if (updateIndex === idx) {
					post.title = refEditInput.current.value;
					post.content = refEditTextarea.current.value;
				}
				return post;
			})
		);
	};

	useEffect(() => {
		localStorage.setItem('post', JSON.stringify(Posts));
	}, [Posts]);

	return (
		<div className='Community'>
			<div className='inputBox'>
				<input ref={refInput} type='text' placeholder='제목을 입력하세요.' />
				<br />
				<textarea
					ref={refTextarea}
					cols='30'
					rows='3'
					placeholder='본문을 입력하세요.'
				></textarea>

				<nav className='btnSet'>
					<button onClick={resetForm}>cancel</button>
					<button className='write' onClick={createPost}>
						write
					</button>
				</nav>
			</div>

			<div className='showBox'>
				{Posts.map((post, idx) => {
					const string = JSON.stringify(post.data);

					const [year, month, date] = string
						.split('T')[0]
						.split('"')[1]
						.split('-');

					let [hour, min, sec] = string.split('T')[1].split('.')[0].split(':');
					hour = parseInt(hour) + 9;
					hour >= 24 && (hour = hour - 24);

					if (post.enableUpdate) {
						//수정 모드 렌더링
						return (
							<article key={idx}>
								<div className='txt'>
									<input
										type='text'
										defaultValue={post.title}
										ref={refEditInput}
									/>
									<br />
									<textarea
										//react에서 value속성을 적용하려면 무조건 onChange이벤트 연결 필수
										//onChange이벤트 연결하지 않을때에는 value가닌 defaultValue속성 적용
										defaultValue={post.content}
										ref={refEditTextarea}
									/>
								</div>
								<nav className='btnSet'>
									<button onClick={() => disableUpdate(idx)}>Cancel</button>
									<button
										onClick={() => {
											updatePost(idx);
											disableUpdate(idx);
										}}
									>
										Update
									</button>
								</nav>
							</article>
						);
					} else {
						//출력 모드 렌더링

						return (
							<article key={idx}>
								<div className='txt'>
									<h2>{post.title}</h2>
									<p>{post.content}</p>
									<p>{`  ${year}-${month}-${date}`}</p>
									<p>{`  ${hour}:${min}:${sec}`}</p>
								</div>

								<nav className='btnSet'>
									<button onClick={() => enableUpdate(idx)}>Edit</button>
									<button onClick={() => deletePost(idx)}>Delete</button>
								</nav>
							</article>
						);
					}
				})}
			</div>
		</div>
	);
}

// 1. 해당 페이지에서 이슈사항을 설명

/*
아직 데이터베이스를 배우진 않았지만 CRUD 기능을 구현하고 싶어서 로컬저장소를 활용해서 만들었습니다
이슈사항으로는 시간값을 가져왔는데, 로컬저장소에 글이 저장되는 시점의 시간을 표준시로 저장을 해서 현재 시간보다 
9시간이 늦은 시간으로 출력되는 문제가 있었습니다
시간값을 변경하려고 보니 JSON.parse 로 객체형태로 시간을 불러와져서 split 메서드를 쓸 수가 없는데 이유를 몰라서 
오래 고민 했었습니다
객체형태로 변환된 값을 다시 stringify 로 문자화 시킨 다음에 split 으로 문자값 가공하고 다시 화면에 출력했습니다
두 번째 이슈사항으로 친구 컴퓨터로 내 작업물을 확인해보니 해당 브라우저에는 저장된 데이터가 없어서 커뮤니티
페이지가 빈화면으로 출력되는 이슈가 있었습니다 -> 로컬저장소에 값이 없을 때 더미 데이터가 출력되도록 했습니다
*/
