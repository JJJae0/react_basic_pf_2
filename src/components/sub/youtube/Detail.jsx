import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import './Detail.scss';

function Detail() {
	const { id } = useParams();
	const [Data, setData] = useState(null);

	useEffect(() => {
		const api_key = 'AIzaSyDahiuuGjqriZa9DGdl1wIGj_Qi7FmApCE';
		const baseURL = 'https://www.googleapis.com/youtube/v3/playlistItems';

		fetch(`${baseURL}?key=${api_key}&id=${id}&part=snippet`)
			.then((data) => data.json())
			.then((json) => {
				console.log(json.items[0].snippet);
				setData(json.items[0].snippet);
			});
	}, [id]);

	return (
		<div className='Detail'>
			<div className='Layout'>
				<p className='Title'>
					essential; <br />
					<span className='subTitle'> Better music, Better moodial</span>
				</p>
			</div>
			<h2>{Data?.title}</h2>
			<p className='playsubTitle'>{Data?.description}</p>
			<div className='vidBox'>
				<iframe
					src={`https://www.youtube.com/embed/${Data?.resourceId.videoId}`}
					title='youtube'
				></iframe>
			</div>
		</div>
	);
}

export default Detail;
