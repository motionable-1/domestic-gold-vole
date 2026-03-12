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
import {
  FadeInWords,
  FadeInChars,
  SlideInText,
} from "../../library/components/text/TextAnimation";

const COWORK_IMG =
  "https://pub-e3bfc0083b0644b296a7080b21024c5f.r2.dev/claude-demo/1773306563857_n2rl8h6couj_claude_cowork_dashboard.png";

const WORKFLOW_ICON =
  "https://api.iconify.design/lucide/workflow.svg?color=%231A73E8&width=28";
const SPARKLE_ICON =
  "https://api.iconify.design/lucide/sparkle.svg?color=%23D97757&width=20";

const FeatureChip: React.FC<{
  label: string;
  delay: number;
  icon?: string;
}> = ({ label, delay, icon }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const chipSpring = spring({
    frame: frame - delay,
    fps,
    config: { damping: 14, stiffness: 120 },
  });

  const chipY = interpolate(chipSpring, [0, 1], [20, 0]);

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: 8,
        padding: "10px 20px",
        borderRadius: 50,
        background: "rgba(26, 115, 232, 0.08)",
        border: "1px solid rgba(26, 115, 232, 0.15)",
        opacity: chipSpring,
        transform: `translateY(${chipY}px)`,
      }}
    >
      {icon && (
        <Img src={icon} style={{ width: 18, height: 18 }} />
      )}
      <span
        style={{
          fontSize: 15,
          fontWeight: 500,
          color: "#1A73E8",
          letterSpacing: "0.01em",
        }}
      >
        {label}
      </span>
    </div>
  );
};

export const CoworkScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Image entrance
  const imgSpring = spring({
    frame: frame - 15,
    fps,
    config: { damping: 20, stiffness: 80 },
  });

  const imgScale = interpolate(imgSpring, [0, 1], [0.92, 1]);
  const imgY = interpolate(imgSpring, [0, 1], [30, 0]);

  // Ambient blob movement
  const blobY = Math.sin(frame * 0.02) * 10;

  return (
    <AbsoluteFill>
      {/* Decorative blob */}
      <div
        style={{
          position: "absolute",
          top: -60,
          left: -80,
          transform: `translateY(${blobY}px)`,
          opacity: 0.08,
        }}
      >
        <LiquidShape
          color="#1A73E8"
          colorEnd="#6FADFC"
          size={400}
          speed={0.4}
          preset="blob"
          seed="cowork-blob"
        />
      </div>

      {/* Left side - Text content */}
      <div
        style={{
          position: "absolute",
          left: 80,
          top: 0,
          bottom: 0,
          width: 520,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          gap: 20,
        }}
      >
        {/* Section label */}
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <Img src={WORKFLOW_ICON} style={{ width: 28, height: 28 }} />
          <FadeInChars
            stagger={0.03}
            duration={0.4}
            startFrom={0}
            style={{
              fontSize: 14,
              fontWeight: 600,
              color: "#1A73E8",
              letterSpacing: "0.08em",
              textTransform: "uppercase" as const,
            }}
          >
            Introducing Cowork
          </FadeInChars>
        </div>

        {/* Main heading */}
        <FadeInWords
          stagger={0.08}
          duration={0.5}
          ease="power3.out"
          startFrom={8}
          style={{
            fontSize: 48,
            fontWeight: 700,
            color: "#141413",
            letterSpacing: "-0.02em",
            lineHeight: 1.15,
            textWrap: "balance",
          }}
        >
          Automate complex workflows
        </FadeInWords>

        {/* Description */}
        <SlideInText
          direction="bottom"
          distance={25}
          stagger={0.02}
          duration={0.5}
          startFrom={25}
          style={{
            fontSize: 18,
            fontWeight: 400,
            color: "#141413",
            opacity: 0.65,
            lineHeight: 1.6,
            maxWidth: 440,
          }}
        >
          From meeting transcripts to polished presentations — Cowork handles
          the heavy lifting while you focus on what matters.
        </SlideInText>

        {/* Feature chips */}
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: 10,
            marginTop: 8,
          }}
        >
          <FeatureChip
            label="Meeting Analysis"
            delay={35}
            icon={SPARKLE_ICON}
          />
          <FeatureChip
            label="Presentation Builder"
            delay={40}
            icon={SPARKLE_ICON}
          />
          <FeatureChip
            label="Report Generation"
            delay={45}
            icon={SPARKLE_ICON}
          />
        </div>
      </div>

      {/* Right side - Dashboard image */}
      <div
        style={{
          position: "absolute",
          right: 50,
          top: "50%",
          transform: `translateY(-50%) translateY(${imgY}px) scale(${imgScale})`,
          opacity: imgSpring,
          width: 680,
          borderRadius: 16,
          overflow: "hidden",
          boxShadow:
            "0 24px 80px rgba(26, 115, 232, 0.15), 0 8px 24px rgba(0,0,0,0.08)",
        }}
      >
        <Img
          src={COWORK_IMG}
          style={{
            width: "100%",
            display: "block",
          }}
        />
        {/* Subtle shimmer overlay */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: `linear-gradient(135deg, transparent 40%, rgba(255,255,255,${interpolate(frame, [20, 50, 80], [0, 0.12, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" })}) 50%, transparent 60%)`,
            pointerEvents: "none",
          }}
        />
      </div>
    </AbsoluteFill>
  );
};
