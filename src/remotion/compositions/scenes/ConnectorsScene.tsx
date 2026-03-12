import React from "react";
import {
  AbsoluteFill,
  useCurrentFrame,
  useVideoConfig,
  spring,
  interpolate,
  Img,
} from "remotion";
import { Particles } from "../../library/components/effects/Particles";
import {
  FadeInWords,
  FadeInChars,
  BlurReveal,
} from "../../library/components/text/TextAnimation";

const CONNECTORS_IMG =
  "https://pub-e3bfc0083b0644b296a7080b21024c5f.r2.dev/claude-demo/1773306564840_swkg8jd8p4_claude_connectors.png";

const LINK_ICON =
  "https://api.iconify.design/lucide/link.svg?color=%231A73E8&width=28";

interface ConnectorBadgeProps {
  name: string;
  icon: string;
  x: number;
  y: number;
  delay: number;
}

const ConnectorBadge: React.FC<ConnectorBadgeProps> = ({
  name,
  icon,
  x,
  y,
  delay,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const badgeSpring = spring({
    frame: frame - delay,
    fps,
    config: { damping: 12, stiffness: 150 },
  });

  const badgeScale = interpolate(badgeSpring, [0, 1], [0.5, 1]);
  const badgeY = interpolate(badgeSpring, [0, 1], [15, 0]);

  // Subtle float
  const floatY = Math.sin((frame + delay * 10) * 0.03) * 4;

  return (
    <div
      style={{
        position: "absolute",
        left: x,
        top: y,
        transform: `scale(${badgeScale}) translateY(${badgeY + floatY}px)`,
        opacity: badgeSpring,
        display: "flex",
        alignItems: "center",
        gap: 10,
        padding: "12px 22px",
        borderRadius: 14,
        background: "rgba(255,255,255,0.95)",
        boxShadow:
          "0 4px 20px rgba(0,0,0,0.06), 0 1px 4px rgba(0,0,0,0.04)",
        border: "1px solid rgba(26, 115, 232, 0.1)",
      }}
    >
      <Img src={icon} style={{ width: 22, height: 22 }} />
      <span
        style={{
          fontSize: 15,
          fontWeight: 600,
          color: "#141413",
          letterSpacing: "0.01em",
        }}
      >
        {name}
      </span>
    </div>
  );
};

export const ConnectorsScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Central image entrance
  const imgSpring = spring({
    frame: frame - 10,
    fps,
    config: { damping: 18, stiffness: 90 },
  });

  const imgScale = interpolate(imgSpring, [0, 1], [0.9, 1]);

  // Pulsing connection lines
  const pulseOpacity = interpolate(
    Math.sin(frame * 0.08),
    [-1, 1],
    [0.3, 0.7]
  );

  return (
    <AbsoluteFill>
      {/* Subtle grid background dots */}
      <Particles
        type="stars"
        count={15}
        speed={0.15}
        colors={["#1A73E815", "#D9775715"]}
        size={[2, 4]}
        seed="conn-stars"
      />

      {/* Top section - text */}
      <div
        style={{
          position: "absolute",
          top: 60,
          left: 0,
          right: 0,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 14,
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <Img src={LINK_ICON} style={{ width: 28, height: 28 }} />
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
            Connectors
          </FadeInChars>
        </div>

        <FadeInWords
          stagger={0.08}
          duration={0.5}
          ease="power3.out"
          startFrom={6}
          style={{
            fontSize: 46,
            fontWeight: 700,
            color: "#141413",
            letterSpacing: "-0.02em",
            lineHeight: 1.2,
            textAlign: "center",
            textWrap: "balance",
          }}
        >
          Integrates with your tools
        </FadeInWords>

        <BlurReveal
          stagger={0.02}
          duration={0.5}
          startFrom={20}
          style={{
            fontSize: 18,
            fontWeight: 400,
            color: "#141413",
            opacity: 0.6,
            textAlign: "center",
            maxWidth: 520,
          }}
        >
          Connect Google Workspace, Slack, and more to supercharge your
          workflows
        </BlurReveal>
      </div>

      {/* Central connectors image */}
      <div
        style={{
          position: "absolute",
          left: "50%",
          top: "50%",
          transform: `translate(-50%, -38%) scale(${imgScale})`,
          opacity: imgSpring,
          width: 720,
          borderRadius: 20,
          overflow: "hidden",
          boxShadow:
            "0 30px 80px rgba(0,0,0,0.12), 0 8px 24px rgba(26,115,232,0.1)",
        }}
      >
        <Img
          src={CONNECTORS_IMG}
          style={{ width: "100%", display: "block" }}
        />
      </div>

      {/* Floating connector badges */}
      <ConnectorBadge
        name="Google Workspace"
        icon="https://api.iconify.design/logos/google-workspace.svg?width=22"
        x={90}
        y={380}
        delay={25}
      />
      <ConnectorBadge
        name="Slack"
        icon="https://api.iconify.design/logos/slack-icon.svg?width=22"
        x={140}
        y={520}
        delay={32}
      />
      <ConnectorBadge
        name="Notion"
        icon="https://api.iconify.design/logos/notion-icon.svg?width=22"
        x={1100}
        y={400}
        delay={38}
      />
      <ConnectorBadge
        name="GitHub"
        icon="https://api.iconify.design/mdi/github.svg?color=%23141413&width=22"
        x={1050}
        y={540}
        delay={44}
      />

      {/* Connecting pulse lines */}
      <svg
        style={{
          position: "absolute",
          inset: 0,
          pointerEvents: "none",
          opacity: pulseOpacity,
        }}
        width="1920"
        height="1080"
      >
        <line
          x1="270"
          y1="400"
          x2="560"
          y2="450"
          stroke="#1A73E8"
          strokeWidth="1.5"
          strokeDasharray="6 6"
          opacity="0.3"
        />
        <line
          x1="310"
          y1="540"
          x2="560"
          y2="500"
          stroke="#1A73E8"
          strokeWidth="1.5"
          strokeDasharray="6 6"
          opacity="0.3"
        />
        <line
          x1="1100"
          y1="420"
          x2="1340"
          y2="450"
          stroke="#1A73E8"
          strokeWidth="1.5"
          strokeDasharray="6 6"
          opacity="0.3"
        />
        <line
          x1="1050"
          y1="560"
          x2="1340"
          y2="500"
          stroke="#1A73E8"
          strokeWidth="1.5"
          strokeDasharray="6 6"
          opacity="0.3"
        />
      </svg>
    </AbsoluteFill>
  );
};
