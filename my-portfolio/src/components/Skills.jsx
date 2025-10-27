import './Skills.css'

function Skills() {
  const skills = [
    'JavaScript',
    'React',
    'Node.js',
    'Python',
    'TypeScript',
    'Git',
    'HTML/CSS',
    'Vite',
    'MongoDB',
    'Express'
  ]

  return (
    <section id="skills" className="skills">
      <div className="container">
        <h2 className="section-title">Skills</h2>
        <div className="skills-grid">
          {skills.map((skill, index) => (
            <div key={index} className="skill-card">
              {skill}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Skills
