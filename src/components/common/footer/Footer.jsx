import React from 'react';
import '../footer/Footer.scss';
import { AiFillInstagram } from 'react-icons/ai';
import { BiLogoFacebook } from 'react-icons/bi';
import { BsGithub, BsTwitter } from 'react-icons/bs';

const Footer = () => {
	return (
		<footer>
			<div className='top'>
				<h2>Company</h2>
				<div className='footer1'>
					<ul>
						<li>
							<h3>IT Digital Enterprise</h3>
						</li>

						<li>APPLE</li>
						<li>Microsot</li>
						<li>Samsung Electronics</li>
						<li>Alphabet</li>
					</ul>
					<ul>
						<li>
							<h3>Automobile</h3>
						</li>
						<li>TOYOTA</li>
						<li>Mercedes-Benz</li>
						<li>BMW</li>
						<li>Tesla</li>
						<li>Hyundai</li>
						<li>Bonorum</li>
						<li>Porsche</li>
					</ul>
					<ul>
						<li>
							<h3>Pharmaceutical Company</h3>
						</li>
						<li>Pfizer</li>
						<li>AbbVie</li>
						<li>Janssen</li>
						<li>GSK</li>
						<li>BMS</li>
						<li>Sanofi</li>
					</ul>
				</div>
			</div>
			<div className='lower'>
				<span>ⓒ 2023. Portfolio</span>

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
