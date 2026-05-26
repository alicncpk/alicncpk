"use client";

import React, { useState, useEffect } from "react";
import { 
  PenTool, Cpu, Layers, HardHat, Award, ExternalLink, 
  Mail, Phone, Send, Globe, Sun, Moon, Menu, X, History
} from "lucide-react";
import Image from "next/image";
import { useTheme } from "next-themes";
import { AnimatedSection, AnimatedCard } from "../../components/AnimatedSection";
import "./ko_admin.css"; // Custom styling overrides for timeline and layouts

export default function KoreanHome() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  
  // Form State
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [formStatus, setFormStatus] = useState("");
  const [formLoading, setFormLoading] = useState(false);

  useEffect(() => {
    setMounted(true);
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    
    // Silent background visitor traffic analytics tracking for Korean segment
    fetch("/api/proxy?endpoint=/api/log-visit", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ path: "/ko" })
    }).catch((err) => console.error("Silent analytics tracking failed:", err));

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormLoading(true);
    setFormStatus("");

    try {
      const { createClient } = await import("../../lib/supabase/client");
      const supabase = createClient();
      
      const { error } = await supabase.from("system_logs").insert({
        type: "CONTACT_FORM_KO",
        message: JSON.stringify({ name, email, subject, message, lang: "ko" }),
        status: "PENDING"
      });

      if (error) throw error;
      
      setFormStatus("성공적으로 접수되었습니다. 신속하게 견적 및 도면 피드백을 전달해 드리겠습니다!");
      setName("");
      setEmail("");
      setSubject("");
      setMessage("");
    } catch (err: any) {
      setFormStatus(`오류가 발생했습니다: ${err.message || "다시 시도해 주세요."}`);
    } finally {
      setFormLoading(false);
    }
  };

  return (
    <>
      {/* 1. Native Korean Top Contact Bar */}
      <div className="top-contact-bar">
        <div className="top-contact-content">
          <a href="https://wa.me/923440708494?text=Hi%20,%20I%20am%20coming%20from%20your%20website%20,%20Can%20i%20get%20more%20info%20about%20your%20business%20?" target="_blank" rel="noreferrer" className="top-contact-link">
            <Phone size={13} style={{ marginRight: '6px' }} />
            <span>+92 344 0708494</span>
          </a>
          <a href="mailto:thealidevmail@gmail.com" className="top-contact-link">
            <Mail size={13} style={{ marginRight: '6px' }} />
            <span>thealidevmail@gmail.com</span>
          </a>
        </div>
      </div>

      {/* 2. Self-Contained Korean Navigation Bar */}
      <nav className={`navbar ${scrolled ? "scrolled" : ""}`}>
        <div className="nav-content">
          <a href="/ko" className="logo">
            <div className="logo-img-wrapper">
              <Image src="/logo_final.png" alt="Ali CNC Logo" width={80} height={44} priority className="logo-img" style={{ width: 'auto', height: '100%' }} />
            </div>
            <span className="logo-text">Ali<span className="gradient-text">CNC</span></span>
          </a>
          
          <div className={`nav-links ${menuOpen ? "open" : ""}`}>
            <a href="#ko-services" onClick={() => setMenuOpen(false)}>서비스 분야</a>
            <a href="#ko-why-choose-us" onClick={() => setMenuOpen(false)}>설계 강점</a>
            <a href="#ko-experience" onClick={() => setMenuOpen(false)}>실무 이력</a>
            <a href="#ko-faq" onClick={() => setMenuOpen(false)}>자주 묻는 질문</a>
            
            <div className="nav-actions" style={{ display: 'flex', gap: '15px', alignItems: 'center' }}>
              {mounted && (
                <button 
                  className="theme-toggle" 
                  onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                  aria-label="Toggle Theme"
                >
                  {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
                </button>
              )}
              
              {/* Globe Switcher Back to Global English Page */}
              <a href="/" className="lang-link" style={{ display: 'flex', gap: '5px', alignItems: 'center', fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
                <Globe size={16} />
                <span>Global (EN)</span>
              </a>
            </div>

            <a href="#ko-contact" className="btn-primary nav-btn" onClick={() => setMenuOpen(false)}>
              도면 견적 문의
            </a>
          </div>

          <button className="mobile-menu-btn" onClick={() => setMenuOpen(!menuOpen)}>
            {menuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </nav>

      {/* 3. Native Korean Main Content */}
      <main>
        {/* Hero Section */}
        <AnimatedSection className="hero-section" id="ko-home">
          <Image src="/hero_bg.png" alt="High-Precision CNC Woodshop Floor" fill priority className="hero-bg-image" style={{ objectFit: 'cover', opacity: 0.1 }} />
          <div className="hero-content">
            <div style={{ marginBottom: '2rem' }}>
              <Image src="/logo_final.png" alt="Ali CNC Logo" width={220} height={120} priority style={{ margin: '0 auto', objectFit: 'contain', height: 'auto' }} />
            </div>
            <span className="hero-greeting" style={{ display: 'block', marginBottom: '1rem', fontWeight: 600, color: 'var(--accent-color)', letterSpacing: '0.05em', textTransform: 'uppercase' }}>
              우리는 도면을 설계하고, 대표님은 스핀들을 돌립니다.™
            </span>
            <h1 className="hero-title">
              고정밀 CAD/CAM <br />
              <span className="gradient-text">B2B 도면 & G-코드</span> 제작 대행
            </h1>
            <p className="hero-description" style={{ maxWidth: '800px', margin: '0 auto 2.5rem' }}>
              불완전한 벡터 도면과 비최적화 툴패스로 인해 고가의 목재 합판과 아크릴 자재를 낭비하지 마세요. 
              Veteran operator인 Raja Muhammad Ali Asghar 대표가 다년간 실제 가구 공방 및 조각실 현장에서 스핀들을 조작하고 톱밥을 마시며 쌓은 노하우를 녹여냅니다. 
              기계 멈춤, 가공 면 뜯김, 툴 충돌 걱정 없는 완전무결하고 정밀한 CNC 최적화 가공 도면을 이메일과 카카오톡으로 신속하게 전송해 드립니다.
            </p>
            <div className="hero-actions">
              <a href="#ko-contact" className="btn-primary">카카오톡 B2B 견적 문의하기</a>
            </div>
          </div>
        </AnimatedSection>

        {/* Services Section */}
        <AnimatedSection className="section" id="ko-services">
          <h2 className="section-title">CNC 특화 <span className="gradient-text">CAD/CAM 서비스</span></h2>
          <div className="grid-3">
            <AnimatedCard className="glass-panel service-card" delay={0.1}>
              <Layers className="service-icon" size={40} />
              <h3>3D CAD 모델링 & 디지털 도면 대행</h3>
              <p>손그림 스케치, 낙서 수준의 스펙 메모, 또는 가공용 PDF 도면을 정밀한 3D 캐드 도면 파일(.STEP, .IGES, .STL, .DWG)로 변환해 드립니다. 가공 및 조립이 즉시 가능한 조립 공차 완벽 설계.</p>
            </AnimatedCard>
            <AnimatedCard className="glass-panel service-card" delay={0.2}>
              <Cpu className="service-icon" size={40} />
              <h3>고효율 G-코드 툴패스 프로그래밍</h3>
              <p>Vectric Aspire를 활용하여 귀사의 목공 기계, 스핀들 마력, 가공 속도(Feeds & Speeds)에 커스텀 설계된 툴패스 파일(.NC, .TAP)을 출력합니다. 가공 속도 단축 및 고가 비트 발열 파손 예방.</p>
            </AnimatedCard>
            <AnimatedCard className="glass-panel service-card" delay={0.3}>
              <HardHat className="service-icon" size={40} />
              <h3>DFM 설계 선행 검수 및 시뮬레이션</h3>
              <p>값비싼 하드우드 원목, 자작나무 합판을 베큠 테이블에 올리기 전에 3D 시뮬레이션으로 충돌 오차를 미리 점검합니다. 툴패스 오버랩, 베큠 영역 침범, 조각 깊이를 완벽히 사전 선행 통제합니다.</p>
            </AnimatedCard>
          </div>
        </AnimatedSection>

        {/* Why Choose Us Section */}
        <AnimatedSection className="section" id="ko-why-choose-us">
          <h2 className="section-title">현장 작업자의 <span className="gradient-text">확실한 차이점</span></h2>
          <div className="grid-3">
            <AnimatedCard className="glass-panel service-card" delay={0.1}>
              <PenTool className="service-icon" size={40} />
              <h3>노드 최적화 베지에 벡터 곡선</h3>
              <p>설계에 불필요한 캐드 노드가 가득하면 CNC 갠트리가 뚝뚝 끊기며 구동하여 원목 단면에 미세한 흔들림 절삭 자국(chatter marks)이 남게 됩니다. 당사는 초정밀 곡선 벡터화로 실크처럼 부드러운 가공 마감을 완성합니다.</p>
            </AnimatedCard>
            <AnimatedCard className="glass-panel service-card" delay={0.2}>
              <h3>합판 자재 손실 최소화 네스팅</h3>
              <p>원목과 수입 합판 단가는 날로 상승하고 있습니다. 고효율 공간 분할 알고리즘을 사용해 대표님의 MDF, 자작나무, 아크릴 판재 공간을 1mm²까지 알뜰하게 활용하도록 집약적인 네스팅 배열을 설계합니다.</p>
            </AnimatedCard>
            <AnimatedCard className="glass-panel service-card" delay={0.3}>
              <h3>실제 목공소 세팅 경력 대표 설계</h3>
              <p>책상 앞에만 앉아 디지털 그림을 그리는 비실무 디자이너와 다릅니다. 당사 대표는 기계실 제로 원점을 잡고 백래시 조율과 비트를 직접 교체하며 톱밥을 치우던 실무 경력을 보유해, 기계 컨트롤러의 특성을 완전히 꿰뚫고 있습니다.</p>
            </AnimatedCard>
          </div>
        </AnimatedSection>

        {/* FAQ Section */}
        <AnimatedSection className="section" id="ko-faq">
          <h2 className="section-title">자주 묻는 <span className="gradient-text">질문 (명확한 답변)</span></h2>
          <div className="grid-2">
            <AnimatedCard className="glass-panel service-card" delay={0.1}>
              <h3>Q. 목재나 원판 부품을 실제 가공해서 택배로 배송해 주시나요?</h3>
              <p>아니요. 당사는 100% 디지털 CAD/CAM 가공 도면 및 G코드 설계 대행 виртуальный 팩토리입니다. 실물 자재 배송에 드는 값비싼 화물 물류비, 인천항 통관 지연, 파손 부담 없이, 대표님의 이메일과 카카오톡으로 신속히 정밀 블루프린트를 전송합니다.</p>
            </AnimatedCard>
            <AnimatedCard className="glass-panel service-card" delay={0.2}>
              <h3>Q. 견적 문의와 작업 의뢰는 어떤 절차로 진행되나요?</h3>
              <p>하단의 카카오톡 오픈채팅 혹은 이메일로 손그림 낙서, 치수 스케치, dimensioned PDF 도면을 보내주시면 즉시 검토하여 회신을 드립니다. 견적 확정 후 3D 시뮬레이션 모델 렌더링 검수를 거쳐 완벽한 최종 파일을 전송해 드립니다.</p>
            </AnimatedCard>
            <AnimatedCard className="glass-panel service-card" delay={0.3}>
              <h3>Q. 호환되는 소프트웨어 및 가공 파일 형식은 어떻게 되나요?</h3>
              <p>국내외 모든 상업용 CNC 라우터 컨트롤러와 완벽 호환됩니다. 벡터 도면(.DXF, .SVG), 3D 릴리프 모델(.STEP, .IGES, .STL), 기계 구동 G코드(.NC, .TAP)를 지원하며, 주 설계 툴은 AutoCAD, Onshape, Vectric Aspire입니다.</p>
            </AnimatedCard>
            <AnimatedCard className="glass-panel service-card" delay={0.4}>
              <h3>Q. 도면 출고까지 제작 소요 기간은 얼마나 걸리나요?</h3>
              <p>단순 2D 판재 레이아웃 및 공간 네스팅 배열은 24~48시간 이내에 번개 출고됩니다. 복잡한 3D 조립 가구 기계식 하드웨어 모듈화 모델링 및 깊이 연산 최적화는 3~5일이 소요됩니다. 급한 공장 가동 일정이 있으시면 카카오톡으로 선 배정을 신청하세요.</p>
            </AnimatedCard>
          </div>
        </AnimatedSection>

        {/* Experience Timeline Section */}
        <AnimatedSection className="section" id="ko-experience">
          <h2 className="section-title">알리 대표의 <span className="gradient-text">실전 Workshop 이력</span></h2>
          <div className="timeline-container-ko" style={{ maxWidth: '800px', margin: '0 auto', textAlign: 'left' }}>
            <div className="timeline">
              <div className="timeline-item">
                <div className="timeline-badge" style={{ left: '-3rem' }}>Virtual</div>
                <div className="timeline-content">
                  <h4>Virtual CAD/CAM 벡터 최고 설계 감독</h4>
                  <span className="timeline-date">2026년 5월 – 현재</span>
                  <p>완전 virtuales B2B 프리랜서 캐드캠 오피스 공장 운영. 글로벌 고객사(미국, 유럽, 국내)를 위한 정밀 기계 부품 및 가공 합판 최적화 갠트리 제어 코드 릴리스.</p>
                </div>
              </div>

              <div className="timeline-item">
                <div className="timeline-badge" style={{ left: '-3rem' }}>Machinist</div>
                <div className="timeline-content">
                  <h4>현장 CNC 스핀들 오퍼레이터 & 기계실 테크니션</h4>
                  <span className="timeline-date">2025년 9월 – 2026년 5월</span>
                  <p>실제 대형 원목 가구 공장(Umer CNC)의 톱밥실에서 근무. 하드우드 옹이 깨짐, 스핀들 모터 과열 정지, 베큠 압력 손실 등 현장 공구 조작과 정비를 마스터하며 물리적 감각 습득.</p>
                </div>
              </div>

              <div className="timeline-item">
                <div className="timeline-badge" style={{ left: '-3rem' }}>Academy</div>
                <div className="timeline-content">
                  <h4>공인 G-Code 제어 설계사 (TITAN-3M & 2M)</h4>
                  <span className="timeline-date">2026년 4월</span>
                  <p>세계 1위 CNC 마시닝 테크놀로지 칼리지 교육 과정 이수. 무결한 좌표계 및 원점 옵셋 좌표 이동 계산법을 정밀 통계 설계에 반영.</p>
                </div>
              </div>

              <div className="timeline-item">
                <div className="timeline-badge" style={{ left: '-3rem' }}>PSEB</div>
                <div className="timeline-content">
                  <h4>Virtual 우드 카빙 벡터 해킹 라이선스 취득</h4>
                  <span className="timeline-date">2026년 4월 – 현재</span>
                  <p>파키스탄 소프트웨어 수출국(PSEB) 공인 프리랜서 테크니컬 어드바이저 등록. 안전하고 효율적인 파일 전송 보증.</p>
                </div>
              </div>
            </div>
          </div>
        </AnimatedSection>

        {/* Contact Section */}
        <AnimatedSection className="section" id="ko-contact">
          <h2 className="section-title">B2B 신속 <span className="gradient-text">견적 & 도면 검수</span></h2>
          <p className="section-subtitle" style={{ maxWidth: '600px', margin: '0 auto 3rem', color: 'var(--text-secondary)' }}>
            가공하려는 도면 스케치, 규격 치수 메모, 또는 기존 캐드 파일을 전달해 주세요. 오차 없는 정밀 분석을 약속합니다.
          </p>

          <div className="admin-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1.2fr', gap: '2rem', textAlign: 'left' }}>
            {/* Left Column: Localized Trust Channels */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              
              {/* Special KakaoTalk Open Chat Card - Primary for Korea */}
              <div className="control-card glass-panel" style={{ border: '2px solid rgba(245, 158, 11, 0.4)' }}>
                <h3 className="card-title" style={{ color: '#f59e0b' }}>
                  <Award size={20} />
                  카카오톡 1:1 오픈채팅 견적
                </h3>
                <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', margin: '0 0 1rem' }}>
                  공방 사장님들이 가장 신뢰하시는 카카오톡 오픈채팅 실시간 접수 채널입니다. 모바일로 찍은 손그림이나 사진도 즉시 접수가 가능합니다.
                </p>
                <a 
                  href="https://open.kakao.com/" 
                  target="_blank" 
                  rel="noreferrer" 
                  className="btn-primary" 
                  style={{ width: '100%', justifyContent: 'center', background: '#f59e0b', color: '#000', fontWeight: 'bold' }}
                >
                  카카오톡 오픈채팅 문의하기
                </a>
                <p style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', marginTop: '0.75rem', fontStyle: 'italic' }}>
                  ⚡ 실시간 한국어 데스크: 한국 목공소 업무 시간대에 맞춰 긴급 도면 피드백 및 조율을 반영합니다.
                </p>
              </div>

              {/* Email Intake Card */}
              <div className="control-card glass-panel">
                <h3 className="card-title">
                  <Mail size={18} style={{ color: 'var(--accent-color)' }} />
                  이메일 기술 문서 접수
                </h3>
                <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', margin: '0 0 1rem' }}>
                  용량이 큰 캐드 원본 도면 파일(.DWG, .DXF)이나 여러 장의 스펙 문서는 공식 접수 이메일로 첨부해 주시면 정밀 판독합니다.
                </p>
                <a 
                  href="mailto:thealidevmail@gmail.com" 
                  className="btn-outline" 
                  style={{ width: '100%', justifyContent: 'center', display: 'inline-flex', padding: '10px', borderRadius: '8px', border: '1px solid var(--glass-border)' }}
                >
                  thealidevmail@gmail.com
                </a>
              </div>

              {/* CadCrowd Portfolio Card */}
              <div className="control-card glass-panel">
                <h3 className="card-title">
                  <ExternalLink size={18} style={{ color: 'var(--accent-color)' }} />
                  CadCrowd 공인 캐드 포트폴리오
                </h3>
                <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', margin: '0 0 1rem' }}>
                  글로벌 프리랜스 기계 설계 전문가 플랫폼을 통해 당사의 공식 인증 기계 설계 포트폴리오 및 가공 검수 평점을 확인하세요.
                </p>
                <a 
                  href="https://www.cadcrowd.com/profile/212733-thealidev" 
                  target="_blank" 
                  rel="noreferrer" 
                  className="btn-outline"
                  style={{ width: '100%', justifyContent: 'center', display: 'inline-flex', padding: '10px', borderRadius: '8px', border: '1px solid var(--glass-border)' }}
                >
                  CadCrowd 프로필 보기
                </a>
              </div>

            </div>

            {/* Right Column: Localized B2B Intake Form */}
            <div className="control-card glass-panel" style={{ padding: '2rem' }}>
              <h3 style={{ fontSize: '1.25rem', fontWeight: 700, marginBottom: '1.5rem', display: 'flex', gap: '8px', alignItems: 'center' }}>
                <Send size={18} style={{ color: 'var(--accent-color)' }} />
                가공 도면 접수 및 기술 검토 요청
              </h3>
              
              <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                  <label style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>의뢰인 또는 업체명</label>
                  <input 
                    type="text" 
                    placeholder="예: 홍길동 (길동목공소)" 
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                    style={{ padding: '12px', background: 'rgba(255,255,255,0.05)', border: '1px solid var(--glass-border)', borderRadius: '8px', color: 'var(--text-primary)' }}
                  />
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                  <label style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>비즈니스 이메일 주소</label>
                  <input 
                    type="email" 
                    placeholder="you@company.com" 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    style={{ padding: '12px', background: 'rgba(255,255,255,0.05)', border: '1px solid var(--glass-border)', borderRadius: '8px', color: 'var(--text-primary)' }}
                  />
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                  <label style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>가공 타입 / 사용 소프트웨어</label>
                  <input 
                    type="text" 
                    placeholder="예: 싱크대 도면 네스팅, 아스파이어 부조 조각 G코드" 
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    required
                    style={{ padding: '12px', background: 'rgba(255,255,255,0.05)', border: '1px solid var(--glass-border)', borderRadius: '8px', color: 'var(--text-primary)' }}
                  />
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                  <label style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>의뢰 스펙 및 라우터 기계 정보</label>
                  <textarea 
                    placeholder="MDF/원목 두께, 사용 가공 비트 직경, 기계 컨트롤러 스펙, 요구 마감 정도 등 상세 요청사항을 적어주시면 더 오차 없는 설계가 가능합니다..." 
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    required
                    rows={4}
                    style={{ padding: '12px', background: 'rgba(255,255,255,0.05)', border: '1px solid var(--glass-border)', borderRadius: '8px', color: 'var(--text-primary)', fontFamily: 'inherit', resize: 'vertical' }}
                  />
                </div>

                <button type="submit" className="btn-primary" disabled={formLoading} style={{ justifyContent: 'center', padding: '14px', fontSize: '1rem' }}>
                  {formLoading ? "전송 중..." : "견적 및 기술 검수 제출"}
                </button>

                {formStatus && (
                  <div className="auth-success" style={{ margin: 0, fontSize: '0.85rem', padding: '10px', borderRadius: '6px', textAlign: 'center' }}>
                    {formStatus}
                  </div>
                )}
              </form>
            </div>
          </div>
        </AnimatedSection>
      </main>

      {/* 4. Native Korean Footer */}
      <footer className="footer-section">
        <div className="section" style={{ padding: '4rem 1.5rem 2rem' }}>
          <div className="footer-content" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '2rem', textAlign: 'center' }}>
            <div style={{ maxWidth: '600px' }}>
              <h2 style={{ fontSize: '1.75rem', fontWeight: 800, marginBottom: '1rem', color: 'var(--text-primary)' }}>
                스핀들이 멈춰있는 시간은 고스란히 손실입니다. <br />
                지금 바로 완벽한 가공 도면을 확보하세요.
              </h2>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', lineHeight: 1.6 }}>
                합판 재단 에러, 아스파이어 공구 경로 깨짐, 툴 충돌로 인한 작업 중단을 근절하세요. 
                라우터 베트 위에 누워있는 기계실의 기계 감각을 지닌 B2B 전문 파트너와 함께 가공 능률을 200% 확장하세요.
              </p>
            </div>

            <a href="#ko-contact" className="btn-primary" style={{ padding: '12px 30px' }}>
              B2B 카카오톡 견적 접수하기
            </a>

            <div className="footer-links" style={{ display: 'flex', gap: '20px', fontSize: '0.9rem', flexWrap: 'wrap', justifyContent: 'center' }}>
              <a href="https://www.cadcrowd.com/profile/212733-thealidev" target="_blank" rel="noreferrer" className="footer-link">CadCrowd</a>
              <a href="https://www.crunchbase.com/organization/ali-cnc-pakistan" target="_blank" rel="noreferrer" className="footer-link">Crunchbase</a>
            </div>

            <div style={{ borderTop: '1px solid var(--glass-border)', width: '100%', paddingTop: '2rem', marginTop: '1rem' }}>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.8rem', lineHeight: 1.5 }}>
                © {new Date().getFullYear()} Ali CNC SMC Ptv Ltd. Made in Rawalpindi with love, coffee, and 100% digital, physical-dust-free virtual sawdust. <br />
                본 웹사이트를 빌드하고 구동하는 과정에서 그 어떤 라우터 머신이나 날물도 다치지 않았음을 엄격히 증명합니다.
              </p>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}
