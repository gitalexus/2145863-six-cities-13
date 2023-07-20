import type { AnchorHTMLAttributes } from "react";
import {Link as RouterLink} from 'react-router-dom';

type ULinkProps = Pick<
	AnchorHTMLAttributes<HTMLAnchorElement>,
	'children' | 'className'
> & {
	href: string; // принудительно переопределяем string | undefined на string
};


/**
 * ULink (Universal Link) - универсальная ссылка (обрабатывает внешний и внутренний роутинг)
 * @component
 */
function ULink({children, href, ...props}: ULinkProps) {
	const isExternal = href?.startsWith('http');
	const isAnchor = href?.startsWith('#');

	if (isExternal) {
		return (
			<a href={href} rel="noopener noreffer" target="_blank" {...props}>
				{children}
			</a>
		);
	}

	if (isAnchor) {
		return (
			<a href={href} {...props}>
				{children}
			</a>
		);
	}

	return (
		<RouterLink to={href} {...props}>
			{children}
		</RouterLink>
	);

}

export {ULink};
