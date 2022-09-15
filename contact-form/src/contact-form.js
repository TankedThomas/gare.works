import React from "react";

const encode = (data) => {
	return Object.keys(data)
		.map((key) => encodeURIComponent(key) + "=" + encodeURIComponent(data[key]))
		.join("&");
};

class ContactForm extends React.Component {
	constructor(props) {
		super(props);
		this.state = {name: "", email: "", subject: "", message: "", success: false};
	}

	handleSubmit = (e) => {
		fetch("/", {
			method: "POST",
			headers: {"Content-Type": "application/x-www-form-urlencoded"},
			body: encode({"form-name": "contact", ...this.state})
		})
			.then(() =>
				this.setState({
					name: "",
					email: "",
					subject: "",
					message: "",
					success: true
				})
			)
			.catch((error) => this.setState({success: false}));

		e.preventDefault();
	};

	handleChange = (e) => this.setState({[e.target.name]: e.target.value});

	render() {
		const {name, email, subject, message, success} = this.state;
		return (
			<div className="contact-form">
				<h2 className="grid-item grid-header">Contact Us</h2>
				<form className="grid-item grid-form" name="contact" onSubmit={this.handleSubmit} data-netlify="true" data-netlify-recaptcha="true" netlify-honeypot="bots-r-us">
					<input type="hidden" name="form-name" value="contact" />
					{success && <p className="animate__animated animate__fadeIn  contact-success">Your message has been sent successfully.</p>}
					<p id="bots-r-us">
						<label className="grid-form-label">Do Not Fill</label>
						<input className="grid-form-item" type="text" name="bots-r-us" />
					</p>
					<p>
						<label className="grid-form-label" htmlFor="name">
							Name
						</label>
						<input className="grid-form-item" type="text" name="name" value={name} onChange={this.handleChange} required />
					</p>
					<p>
						<label className="grid-form-label" htmlFor="email">
							Email
						</label>
						<input className="grid-form-item" type="email" name="email" value={email} onChange={this.handleChange} required />
					</p>
					<p>
						<label className="grid-form-label" htmlFor="subject">
							Subject
						</label>
						<input className="grid-form-item" type="text" name="subject" value={subject} onChange={this.handleChange} required />
					</p>
					<p>
						<label className="grid-form-label" htmlFor="message">
							Message
						</label>
						<textarea className="grid-form-text" name="message" value={message} onChange={this.handleChange} required></textarea>
					</p>
					<div className="captcha" data-netlify-recaptcha="true"></div>
					<p>
						<button className="grid-form-btn" type="submit">
							Send
						</button>
					</p>
				</form>
			</div>
		);
	}
}

export default ContactForm;
