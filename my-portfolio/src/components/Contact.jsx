import './Contact.css'

function Contact() {
  return (
    <section id="contact" className="contact">
      <div className="container">
        <h2 className="section-title">Get In Touch</h2>
        <div className="contact-content">
          <p className="contact-intro">
            I'm always open to discussing new projects, creative ideas, or opportunities
            to be part of your visions.
          </p>
          <div className="contact-links">
            <a href="mailto:ana@example.com" className="contact-item">
              <span className="contact-icon">📧</span>
              <span>ana@example.com</span>
            </a>
            <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="contact-item">
              <span className="contact-icon">💻</span>
              <span>GitHub</span>
            </a>
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="contact-item">
              <span className="contact-icon">💼</span>
              <span>LinkedIn</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Contact
