import { useNavigate } from 'react-router-dom';
import Header from '../../components/header/header';
import { ULink } from '../../components/u-link/u-link';
import { useAppDispatch, useDocumentTitle } from '../../hooks';
import { FormEvent, useRef } from 'react';
import { loginAction } from '../../store/api-actions';
import LoadingScreen from '../loading-screen/loading-screen';

function LoginPage(): React.JSX.Element {
	const loginRef = useRef<HTMLInputElement | null>(null);
	const passwordRef = useRef<HTMLInputElement | null>(null);
	const dispatch = useAppDispatch();

	function handleSubmit(evt: FormEvent<HTMLFormElement>): void {
		evt.preventDefault();

		if (loginRef.current !== null && passwordRef !== null) {
			dispatch(loginAction({
				login: loginRef.current.value,
				password: passwordRef.current.value,
			}));
		}
	}

	useDocumentTitle('Login');

	return (
		<div className="page page--gray page--login">
			<Header hideNavigation/>

			<main className="page__main page__main--login">
				<div className="page__login-container container">
					<section className="login">
						<h1 className="login__title">Sign in</h1>
						<form className="login__form form" action="#" method="post" onSubmit={handleSubmit}>
							<div className="login__input-wrapper form__input-wrapper">
								<label className="visually-hidden">E-mail</label>
								<input
									ref={loginRef}
									className="login__input form__input"
									type="email"
									name="email"
									placeholder="Email"
									required={false}
								/>
							</div>
							<div className="login__input-wrapper form__input-wrapper">
								<label className="visually-hidden">Password</label>
								<input
									ref={passwordRef}
									className="login__input form__input"
									type="password"
									name="password"
									placeholder="Password"
									required={false}
								/>
							</div>
							<button className="login__submit form__submit button" type="submit">
								Sign in
							</button>
						</form>
					</section>
					<section className="locations locations--login locations--current">
						<div className="locations__item">
							<ULink className="locations__item-link" href="#">
								<span>Amsterdam</span>
							</ULink>
						</div>
					</section>
				</div>
			</main>
		</div>
	);
}

export default LoginPage;
