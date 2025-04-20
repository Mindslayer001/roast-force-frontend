import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import '../styles/About.css';

const About = () => {
  const features = [
    { icon: '🔥', title: 'AI-Powered Roasts', description: 'Leveraging LLama 3.3 7B llm to create personalized code roasts' },
    { icon: '⚡', title: 'Real-time Analysis', description: 'Instant feedback on Codeforces handles' },
    { icon: '🌟', title: 'Social Sharing', description: 'Generate and share roast cards on social media' },
  ];

  const upcomingFeatures = [
    'Custom roast card themes to increase the user experience',
    'New feature to retrive all the roasts history of a user',
    'Second to Second roast leaderboards to learn socket programming',
    'Integration with more coding platforms for fun',
    'Advanced analytics dashboard'
  ];

  const techStack = [
    'React + TypeScript',
    'Node.js + Express + TypeScript',
    'Groq llm API',
    'Supabase',
    'Framer Motion',
    'Vercel'
  ];

  return (
    <div className="home-container flex-center">
      <div className="container">
        <div className="roast-header text-center">
          <h1 className="roast-title text-gradient">About RoastForce</h1>
          <p className="lead mb-5">
            Where Code Meets Comedy: Turning Your Algorithmic Struggles into Entertainment
          </p>

          {/* Mission Statement */}
          <div className="user-card mb-5">
            <h2 className="text-gradient mb-4">Our Mission 🎯</h2>
            <p className="roast-text">
              I want to learna dn showcase my skills thats way I created this project.By after working on tis I felt like this is going to be something good.
            </p>
          </div>

          {/* Features Grid */}
          <div className="features-section mb-5">
            <h2 className="text-gradient mb-4">Current Features</h2>
            <div className="features-grid">
              {features.map((feature) => (
                <motion.div
                  key={feature.title}
                  className="feature-card"
                  whileHover={{ translateY: -5 }}
                >
                  <span className="feature-icon">{feature.icon}</span>
                  <h3 className="feature-title">{feature.title}</h3>
                  <p className="feature-description">{feature.description}</p>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Tech Stack */}
          <div className="tech-section mb-5">
            <h2 className="text-gradient mb-4">Tech Stack 🛠️</h2>
            <div className="tech-grid">
              {techStack.map((tech) => (
                <motion.div
                  key={tech}
                  className="tech-badge"
                  whileHover={{ scale: 1.05 }}
                >
                  {tech}
                </motion.div>
              ))}
            </div>
          </div>

          {/* Roadmap */}
          <div className="roadmap-section mb-5">
            <h2 className="text-gradient mb-4">What's Next? 🚀</h2>
            <div className="user-card">
              {upcomingFeatures.map((feature) => (
                <div key={feature} className="roadmap-item">
                  <span className="roadmap-icon">▶</span>
                  {feature}
                </div>
              ))}
            </div>
          </div>

          {/* Call to Action */}
          <div className="cta-section">
            <p className="lead mb-4">
              Ready to get roasted? Your code is waiting!
            </p>
            <Link to="/" className="roast-button">
              Try RoastForce Now 🔥
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;