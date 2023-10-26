import { useEffect, useState } from 'react';

export const useMedia = (opt) => {
	//커스텀훅 호출시 미디어쿼리 옵션이 없을때 디폴트로 적용할 수치값
	const defOpt = { mobile: 640, tablet: 1000, laptop: 1400 };
	//해당 커스텀훅 호출시 특정 옵션이 전달되면 해당값으로 defOpt값을 덮어쓰기해서 합침
	const result = { ...defOpt, ...opt };
	console.log(result);
	const [Type, setType] = useState('');

	const getClientWid = () => {
		let wid = window.innerWidth;
		if (wid >= result.laptop) setType('');
		if (wid >= result.tablet && wid < result.laptop) setType('laptop');
		if (wid >= result.mobile && wid < result.tablet) setType('tablet');
		if (wid >= 0 && wid < result.mobile) setType('mobile');
	};

	useEffect(() => {
		getClientWid();
		window.addEventListener('resize', getClientWid);

		return () => window.removeEventListener('resize', getClientWid);
	}, []);
	return Type;
};
