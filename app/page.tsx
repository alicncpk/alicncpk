import Navbar from "../components/Navbar";
import { AnimatedSection, AnimatedCard } from "../components/AnimatedSection";
import { PenTool, Cpu, Layers, HardHat, Award, ExternalLink } from "lucide-react";
import Image from "next/image";

export default function Home() {
  return (
    <>
      <Navbar />
      
      <main>

        {/* Hero Section */}
        <AnimatedSection className="hero-section" id="home">
          <img src="/hero_bg.png" alt="" className="hero-bg-image" />
          <div className="hero-content">
            <div style={{ marginBottom: '2rem' }}>
              <Image src="/logo_final.png" alt="Ali CNC Logo" width={220} height={120} priority style={{ margin: '0 auto', objectFit: 'contain', height: 'auto' }} />
            </div>
            <h2 className="hero-greeting">Welcome to Ali CNC Pakistan</h2>
            <h1 className="hero-title">
              High-Precision <span className="gradient-text">3D Modeling</span> &amp; <br />
              CNC Fabrication Firm
            </h1>
            <p className="hero-description">
              Bridges the gap between digital CAD modeling and physical industrial fabrication. Founded by Raja Muhammad Ali Asghar, Ali CNC Pakistan specializes in 2D/2.5D vector creation, 3D relief modeling, and high-precision CNC manufacturing.
            </p>
            <div className="hero-actions">
              <a href="/contact" className="btn-primary">Start a Project</a>
            </div>
          </div>
        </AnimatedSection>

        {/* Services Section */}
        <AnimatedSection className="section" id="services">
          <h2 className="section-title">Our <span className="gradient-text">Expertise</span></h2>
          <div className="grid-3">
            <AnimatedCard className="glass-panel service-card" delay={0.1}>
              <Layers className="service-icon" size={40} />
              <h3>3D Modeling &amp; CAD Design</h3>
              <p>Technical 3D modeling and CNC-ready product design using cutting-edge tools like Onshape and Vectric.</p>
            </AnimatedCard>
            <AnimatedCard className="glass-panel service-card" delay={0.2}>
              <Cpu className="service-icon" size={40} />
              <h3>CNC Programming</h3>
              <p>Expert programming for precise CNC fabrication, ensuring your designs are perfectly manufactured.</p>
            </AnimatedCard>
            <AnimatedCard className="glass-panel service-card" delay={0.3}>
              <HardHat className="service-icon" size={40} />
              <h3>Design for Manufacturing</h3>
              <p>Optimizing designs early in the process to reduce costs, improve quality, and speed up production.</p>
            </AnimatedCard>
          </div>
        </AnimatedSection>

        {/* Experience & Education Section */}
        <AnimatedSection className="section" id="experience">
          <h2 className="section-title">Experience &amp; <span className="gradient-text">Certifications</span></h2>
          <div className="experience-container">
            <div className="timeline">
              <AnimatedCard className="timeline-item glass-panel" delay={0.1}>
                <Award className="timeline-icon" size={24} />
                <div className="timeline-content">
                  <h4>CEO & Founder</h4>
                  <h5>Ali CNC Pakistan</h5>
                  <p className="timeline-date">May 2026 – Present</p>
                  <p style={{ fontSize: '0.9rem', opacity: 0.8, marginTop: '0.5rem' }}>Led by Raja Muhammad Ali Asghar, specializing in bridging digital design with physical industrial fabrication.</p>
                </div>
              </AnimatedCard>
              <AnimatedCard className="timeline-item glass-panel" delay={0.2}>
                <Award className="timeline-icon" size={24} />
                <div className="timeline-content">
                  <h4>Umer CNC Intern</h4>
                  <h5>Umer CNC</h5>
                  <p className="timeline-date">Sep 2025 – May 2026</p>
                </div>
              </AnimatedCard>
              <AnimatedCard className="timeline-item glass-panel" delay={0.3}>
                <Award className="timeline-icon" size={24} />
                <div className="timeline-content">
                  <h4>CAD - TITAN-3M &amp; 2M Certificates</h4>
                  <h5>TITANS of CNC: Academy</h5>
                  <p className="timeline-date">Apr 2026 – Present</p>
                </div>
              </AnimatedCard>
              <AnimatedCard className="timeline-item glass-panel" delay={0.4}>
                <Award className="timeline-icon" size={24} />
                <div className="timeline-content">
                  <h4>Freelancer Registration</h4>
                  <h5>Pakistan Software Export Board (PSEB)</h5>
                  <p className="timeline-date">Apr 2026 – Present</p>
                </div>
              </AnimatedCard>
            </div>
          </div>
        </AnimatedSection>

        {/* Contact/Footer */}
        <footer id="contact" className="footer">
          <div className="footer-content">
            <div style={{ marginBottom: '1.5rem' }}>
              <Image src="/logo_final.png" alt="Ali CNC Logo" width={146} height={80} loading="lazy" style={{ margin: '0 auto', opacity: 0.8, objectFit: 'contain', height: 'auto' }} />
            </div>
            <h2 className="footer-title">Let&apos;s Build Something Amazing</h2>
            <p>Ready to turn your ideas into high-precision reality? Get in touch today.</p>
            <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', marginTop: '1rem' }}>
              <a href="/contact" className="btn-primary">
                Contact Us
              </a>
            </div>
          </div>
          <div className="footer-bottom">
            <p>&copy; {new Date().getFullYear()} Ali CNC Pakistan. All rights reserved.</p>
          </div>
        </footer>
      </main>
    </>
  );
}
