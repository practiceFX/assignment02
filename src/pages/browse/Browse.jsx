import React from 'react';
import { Card } from 'reactstrap'
import Banner from '../component/banner';
import DetailMovie from '../component/detailMovie';
import MovieList from '../component/movieList';

const Browse = props => {
	const [status, setstatus] = React.useState('false');
	const [detailMovie, setdetailMovie] = React.useState(null);
	//pass data IdMovie to App Componet
	function handleClick(item) {
		setdetailMovie(item);
		setstatus(item.status);
		props.handleIdvideo(item.id);
	}; //end

	// handle click outside to close detailMovie Component
	document.addEventListener('click', (e) => {

		if (e.target.classList.value == 'box-item-movie btn btn-secondary' ||
			e.target.classList.value == 'detail-movie card-body' ||
			e.target.classList.value == 'infor col-6') {
			setstatus('true');
		}
		else {
			setstatus('false');
		}
	})//end
	return (
		<Card className={`page ${status == 'true' ? 'page-detail' : ''} `}>
			<Banner
				poster_path={props.poster_path}
				name={props.name}
				overview={props.overview}>
			</Banner>
			{
				props.loading == true ? ('Loading...') : (
					<React.Fragment>
						<MovieList
							listMovie={props.Original}
							handlePassData={handleClick}
						/>
						<MovieList
							title="Xếp hạng cao"
							listMovie={props.Toprated}
							handlePassData={handleClick}
						/>
						<MovieList
							title="Hành động"
							listMovie={props.Action}
							handlePassData={handleClick}
						/>
						<MovieList
							title="Hài"
							listMovie={props.Comedy}
							handlePassData={handleClick}
						/>
						<MovieList
							title="Kinh dị"
							listMovie={props.Horror}
							handlePassData={handleClick}
						/>
						<MovieList
							title="Lãng mạn"
							listMovie={props.Romance}
							handlePassData={handleClick}
						/>
						<MovieList
							title="Tài Liệu"
							listMovie={props.Document}
							handlePassData={handleClick}
						/>
					</React.Fragment>
				)
			}
			<DetailMovie
				title={detailMovie?.name}
				date_release={detailMovie?.first_air_date}
				vote={detailMovie?.vote_average}
				overview={detailMovie?.overview}
				url={detailMovie?.id}
				status={status} />
		</Card>
	);
}

export default Browse;

