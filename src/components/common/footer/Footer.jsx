import React from 'react';
import '../footer/Footer.scss';
import { AiFillInstagram } from 'react-icons/ai';
import { BiLogoFacebook } from 'react-icons/bi';
import { BsGithub, BsTwitter } from 'react-icons/bs';

const Footer = () => {
	return (
		<footer>
			<div className='top'>
				<h2>Portfolio UI</h2>
				<div className='footer1'>
					<ul>
						<li>
							<h3>Simply</h3>
						</li>

						<li>Industry</li>
						<li>Distracted </li>
						<li>Letters</li>
						<li>Lorem</li>
					</ul>
					<ul>
						<li>
							<h3>Content</h3>
						</li>
						<li>Renaissance</li>
						<li>Standard</li>
						<li>Translation</li>
						<li>Interested</li>
						<li>Comes</li>
						<li>Bonorum</li>
						<li>Malorum</li>
					</ul>
					<ul>
						<li>
							<h3>Characteristic</h3>
						</li>
						<li>Popular</li>
						<li>Hampden</li>
						<li>Purpose</li>
						<li>Typesetting</li>
						<li>PageMaker</li>
						<li>Variations</li>
						<li>Embarrassing</li>
					</ul>
				</div>
			</div>
			<div className='lower'>
				<span>ⓒ 2023. Portfolio. All rights reserved.</span>

				<ul className='sns'>
					<li>
						<BsTwitter />
					</li>
					<li>
						<BsGithub />
					</li>
					<li>
						<BiLogoFacebook />
					</li>
					<li>
						<AiFillInstagram />
					</li>
				</ul>
			</div>
		</footer>
	);
};

export default Footer;
