import React from "react";
import {
  AbsoluteFill,
  useCurrentFrame,
  useVideoConfig,
  spring,
  interpolate,
  Img,
} from "remotion";
import { LiquidShape } from "../../library/components/effects/LiquidShape";
import { Particles } from "../../library/components/effects/Particles";
import { Glow } from "../../library/components/effects/Glow";
import {
  FadeInWords,
  BlurReveal,
  FadeInChars,
} from "../../library/components/text/TextAnimation";

const CLAUDE_LOGO_SVG = `data:image/svg+xml;utf8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%2024%2024%22%20height%3D%2260%22%20fill%3D%22%23D97757%22%3E%3Cpath%20d%3D%22M11.376%2024L10.776%2023.544L10.44%2022.8L10.776%2021.312L11.16%2019.392L11.472%2017.856L11.76%2015.96L11.928%2015.336L11.904%2015.288L11.784%2015.312L10.344%2017.28L8.16%2020.232L6.432%2022.056L6.024%2022.224L5.304%2021.864L5.376%2021.192L5.784%2020.616L8.16%2017.568L9.6%2015.672L10.536%2014.592L10.512%2014.448H10.464L4.128%2018.576L3%2018.72L2.496%2018.264L2.568%2017.52L2.808%2017.28L4.704%2015.96L9.432%2013.32L9.504%2013.08L9.432%2012.96H9.192L8.4%2012.912L5.712%2012.84L3.384%2012.744L1.104%2012.624L0.528%2012.504L0%2011.784L0.048%2011.424L0.528%2011.112L1.224%2011.16L2.736%2011.28L5.016%2011.424L6.672%2011.52L9.12%2011.784H9.504L9.552%2011.616L9.432%2011.52L9.336%2011.424L6.96%209.84L4.416%208.16L3.072%207.176L2.352%206.672L1.992%206.216L1.848%205.208L2.496%204.488L3.384%204.56L3.6%204.608L4.488%205.304L6.384%206.768L8.88%208.616L9.24%208.904L9.408%208.808V8.736L9.24%208.472L7.896%206.024L6.456%203.528L5.808%202.496L5.64%201.872C5.576%201.656%205.544%201.416%205.544%201.152L6.288%200.144001L6.696%200L7.704%200.144001L8.112%200.504001L8.736%201.92L9.72%204.152L11.28%207.176L11.736%208.088L11.976%208.904L12.072%209.168H12.24V9.024L12.36%207.296L12.6%205.208L12.84%202.52L12.912%201.752L13.296%200.840001L14.04%200.360001L14.616%200.624001L15.096%201.32L15.024%201.752L14.76%203.6L14.184%206.504L13.824%208.472H14.04L14.28%208.208L15.264%206.912L16.92%204.848L17.64%204.032L18.504%203.12L19.056%202.688H20.088L20.832%203.816L20.496%204.992L19.44%206.336L18.552%207.464L17.28%209.168L16.512%2010.536L16.584%2010.632H16.752L19.608%2010.008L21.168%209.744L22.992%209.432L23.832%209.816L23.928%2010.2L23.592%2011.016L21.624%2011.496L19.32%2011.952L15.888%2012.768L15.84%2012.792L15.888%2012.864L17.424%2013.008L18.096%2013.056H19.728L22.752%2013.272L23.544%2013.8L24%2014.424L23.928%2014.928L22.704%2015.528L21.072%2015.144L17.232%2014.232L15.936%2013.92H15.744V14.016L16.848%2015.096L18.84%2016.896L21.36%2019.224L21.48%2019.8L21.168%2020.28L20.832%2020.232L18.624%2018.552L17.76%2017.808L15.84%2016.2H15.72V16.368L16.152%2017.016L18.504%2020.544L18.624%2021.624L18.456%2021.96L17.832%2022.176L17.184%2022.056L15.792%2020.136L14.376%2017.952L13.224%2016.008L13.104%2016.104L12.408%2023.352L12.096%2023.712L11.376%2024Z%22%2F%3E%3C%2Fsvg%3E`;

export const CTAScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Button entrance
  const btnSpring = spring({
    frame: frame - 35,
    fps,
    config: { damping: 12, stiffness: 120 },
  });

  const btnScale = interpolate(btnSpring, [0, 1], [0.8, 1]);
  const btnY = interpolate(btnSpring, [0, 1], [20, 0]);

  // Logo pulse
  const logoPulse = 1 + Math.sin(frame * 0.05) * 0.03;

  // Ambient blobs
  const blob1Y = Math.sin(frame * 0.02) * 12;
  const blob2X = Math.cos(frame * 0.018) * 10;

  return (
    <AbsoluteFill>
      {/* Floating blobs */}
      <div
        style={{
          position: "absolute",
          top: 50,
          left: 100,
          transform: `translateY(${blob1Y}px)`,
          opacity: 0.12,
        }}
      >
        <LiquidShape
          color="#1A73E8"
          colorEnd="#6FADFC"
          size={300}
          speed={0.5}
          preset="blob"
          seed="cta1"
        />
      </div>
      <div
        style={{
          position: "absolute",
          bottom: 50,
          right: 100,
          transform: `translateX(${blob2X}px)`,
          opacity: 0.1,
        }}
      >
        <LiquidShape
          color="#D97757"
          colorEnd="#F4A886"
          size={260}
          speed={0.4}
          preset="organic"
          seed="cta2"
        />
      </div>

      {/* Particles */}
      <Particles
        type="dust"
        count={18}
        speed={0.2}
        colors={["#1A73E820", "#D9775720"]}
        size={[2, 5]}
        seed="cta-dust"
      />

      {/* Center content */}
      <AbsoluteFill
        style={{
          justifyContent: "center",
          alignItems: "center",
          display: "flex",
          flexDirection: "column",
          gap: 24,
        }}
      >
        {/* Logo */}
        <div style={{ transform: `scale(${logoPulse})` }}>
          <Glow color="#D97757" intensity={15} pulsate pulseDuration={3}>
            <Img
              src={CLAUDE_LOGO_SVG}
              style={{ width: 60, height: 60 }}
            />
          </Glow>
        </div>

        {/* Main CTA text */}
        <FadeInWords
          stagger={0.1}
          duration={0.6}
          ease="power3.out"
          startFrom={8}
          style={{
            fontSize: 60,
            fontWeight: 700,
            color: "#141413",
            letterSpacing: "-0.03em",
            lineHeight: 1.15,
            textAlign: "center",
            textWrap: "balance",
          }}
        >
          Start building with Claude
        </FadeInWords>

        {/* Subtitle */}
        <BlurReveal
          stagger={0.02}
          duration={0.6}
          startFrom={22}
          style={{
            fontSize: 20,
            fontWeight: 400,
            color: "#141413",
            opacity: 0.6,
            textAlign: "center",
            maxWidth: 480,
          }}
        >
          Experience the power of AI that works the way you think
        </BlurReveal>

        {/* CTA Button */}
        <div
          style={{
            transform: `scale(${btnScale}) translateY(${btnY}px)`,
            opacity: btnSpring,
          }}
        >
          <Glow color="#1A73E8" intensity={12} pulsate pulseDuration={2.5}>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 12,
                padding: "16px 40px",
                borderRadius: 14,
                background: "#141413",
                color: "#FFFFFF",
                fontSize: 18,
                fontWeight: 600,
                letterSpacing: "0.01em",
                boxShadow: "0 8px 32px rgba(20,20,19,0.25)",
              }}
            >
              <span>Try Claude Free</span>
              <span style={{ opacity: 0.7 }}>→</span>
            </div>
          </Glow>
        </div>

        {/* URL */}
        <FadeInChars
          stagger={0.03}
          duration={0.4}
          startFrom={45}
          style={{
            fontSize: 16,
            fontWeight: 500,
            color: "#1A73E8",
            letterSpacing: "0.02em",
            marginTop: 4,
          }}
        >
          claude.ai
        </FadeInChars>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
