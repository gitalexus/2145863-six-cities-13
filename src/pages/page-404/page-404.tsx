import { Link } from 'react-router-dom';
import './page-404.css';

function Page404(): React.JSX.Element {
	return (
		<div className="container-error-404 error">
			<img class="error__image" src="img/404.svg" width="252" height="294" alt="Специалист озадачен." />
			<h1 className="error__title">404</h1>
			<p className="error__desctription">Sorry, the page you visited does not exist.</p>
			<Link to="/" className="button form__submit">Go to main</Link>
			{/* <button className="button form__submit">Go to main</button> */}
		</div>
	);
}

export default Page404;

