import './Projects.css'

function Projects() {
  const projects = [
    {
      title: 'E-Commerce Platform',
      description: 'A full-stack e-commerce solution with user authentication and payment integration.',
      tech: ['React', 'Node.js', 'MongoDB'],
      link: 'https://github.com'
    },
    {
      title: 'Task Manager App',
      description: 'A productivity app for managing tasks and tracking progress with real-time updates.',
      tech: ['React', 'Firebase', 'CSS3'],
      link: 'https://github.com'
    },
    {
      title: 'Weather Dashboard',
      description: 'Interactive weather dashboard with data visualization and location-based forecasts.',
      tech: ['React', 'API Integration', 'Chart.js'],
      link: 'https://github.com'
    }
  ]

  return (
    <section id="projects" className="projects">
      <div className="container">
        <h2 className="section-title">Projects</h2>
        <div className="projects-grid">
          {projects.map((project, index) => (
            <div key={index} className="project-card">
              <h3>{project.title}</h3>
              <p>{project.description}</p>
              <div className="project-tech">
                {project.tech.map((tech, techIndex) => (
                  <span key={techIndex} className="tech-tag">{tech}</span>
                ))}
              </div>
              <a href={project.link} target="_blank" rel="noopener noreferrer" className="project-link">
                View Project →
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Projects
