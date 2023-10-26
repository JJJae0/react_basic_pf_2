//	1. 해당 페이지를 어떤 식으로 작업했고 어떤 이슈가 있었는지 설명

import Layout from '../../common/layout/Layout';
import { useEffect, useState } from 'react';
import './Department.scss';
const path = process.env.PUBLIC_URL;

export default function Department() {
	const [Department, setDepartment] = useState([]);

	useEffect(() => {
		fetch(`${path}/DB/department.json`)
			.then((data) => data.json())
			.catch((err) => console.log(err))
			.then((json) => {
				setDepartment(json.members);
			})
			.catch((err) => console.log(err));
	}, []);

	return (
		<Layout>
			<div className='container'>
				<div className='memberBox'>
					{Department.map((black, idx) => {
						return (
							<article key={black}>
								<div className='pic'>
									<img src={`${path}/img/${black.pic}`} alt={black.name} />
								</div>
								<h2 className='name1'>{black.position}</h2>
								<p className='name2'>{black.name}</p>
							</article>
						);
					})}
				</div>
				<div className='main1'>
					<p className='main2'>less.</p>
					<p className='main3'>+ Categories</p>
				</div>
			</div>
		</Layout>
	);
}

//	1. 해당 페이지를 어떤 식으로 작업했고 어떤 이슈가 있었는지 설명
/*
	정적인 데이터라서 굳이 fetch 를 통해서 데이터를 가져오지 않고 static 하게 컨텐츠를 집어넣을까 
	고민도 했었지만, 데이터기반으로 모든 화면단이 동적으로 생성되게 하고 싶어서 fetch 를 통해서 데이터가 변경되더라도
	자동으로 화면이 갱신되도록 작업을 했습니다

*/
