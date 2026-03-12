import React from "react";
import {
  AbsoluteFill,
  useCurrentFrame,
  useVideoConfig,
  spring,
  interpolate,
  Img,
} from "remotion";
import { BrowserMockup } from "../../library/components/mockups/BrowserMockup";
import { PhoneMockup } from "../../library/components/mockups/PhoneMockup";
import { LiquidShape } from "../../library/components/effects/LiquidShape";
import {
  FadeInWords,
  FadeInChars,
  SlideInText,
} from "../../library/components/text/TextAnimation";

const CHAT_IMG =
  "https://pub-e3bfc0083b0644b296a7080b21024c5f.r2.dev/claude-demo/1773306562799_dtimmfmwead_claude_chat_ui.png";
const CHAT_ICON =
  "https://api.iconify.design/lucide/message-square.svg?color=%231A73E8&width=28";
const SPARKLE_ICON =
  "https://api.iconify.design/lucide/sparkle.svg?color=%23D97757&width=18";

const UseCase: React.FC<{
  label: string;
  delay: number;
}> = ({ label, delay }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const chipSpring = spring({
    frame: frame - delay,
    fps,
    config: { damping: 15, stiffness: 130 },
  });

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: 8,
        opacity: chipSpring,
        transform: `translateX(${interpolate(chipSpring, [0, 1], [-15, 0])}px)`,
      }}
    >
      <Img src={SPARKLE_ICON} style={{ width: 18, height: 18 }} />
      <span
        style={{
          fontSize: 16,
          fontWeight: 500,
          color: "#141413",
          opacity: 0.8,
        }}
      >
        {label}
      </span>
    </div>
  );
};

export const ChatScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Browser mockup entrance
  const browserSpring = spring({
    frame: frame - 15,
    fps,
    config: { damping: 18, stiffness: 80 },
  });

  const browserY = interpolate(browserSpring, [0, 1], [40, 0]);
  const browserScale = interpolate(browserSpring, [0, 1], [0.93, 1]);

  // Phone mockup entrance (delayed)
  const phoneSpring = spring({
    frame: frame - 30,
    fps,
    config: { damping: 14, stiffness: 100 },
  });

  const phoneY = interpolate(phoneSpring, [0, 1], [50, 0]);
  const phoneRotate = interpolate(phoneSpring, [0, 1], [8, 3]);

  // Ambient
  const blobFloat = Math.sin(frame * 0.025) * 8;

  return (
    <AbsoluteFill>
      {/* Decorative blob */}
      <div
        style={{
          position: "absolute",
          bottom: -100,
          right: -60,
          transform: `translateY(${blobFloat}px)`,
          opacity: 0.08,
        }}
      >
        <LiquidShape
          color="#1A73E8"
          colorEnd="#A5C8FF"
          size={350}
          speed={0.5}
          preset="blob"
          seed="chat-blob"
        />
      </div>

      {/* Left side - text */}
      <div
        style={{
          position: "absolute",
          left: 80,
          top: 0,
          bottom: 0,
          width: 480,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          gap: 18,
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <Img src={CHAT_ICON} style={{ width: 28, height: 28 }} />
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
            Chat Everywhere
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
            lineHeight: 1.15,
            textWrap: "balance",
          }}
        >
          Web, mobile & desktop
        </FadeInWords>

        <SlideInText
          direction="bottom"
          distance={20}
          stagger={0.02}
          duration={0.5}
          startFrom={22}
          style={{
            fontSize: 18,
            fontWeight: 400,
            color: "#141413",
            opacity: 0.6,
            lineHeight: 1.6,
            maxWidth: 420,
          }}
        >
          Use Claude wherever you work. Code, create content, analyze data, and
          brainstorm ideas on any platform.
        </SlideInText>

        {/* Use cases */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 12,
            marginTop: 12,
          }}
        >
          <UseCase label="Coding & development" delay={35} />
          <UseCase label="Content creation" delay={40} />
          <UseCase label="Data analysis" delay={45} />
          <UseCase label="Research & brainstorming" delay={50} />
        </div>
      </div>

      {/* Right side - Mockups */}
      <div
        style={{
          position: "absolute",
          right: 80,
          top: "50%",
          transform: "translateY(-50%)",
          width: 750,
          height: 550,
        }}
      >
        {/* Browser mockup */}
        <div
          style={{
            position: "absolute",
            left: 0,
            top: 0,
            transform: `translateY(${browserY}px) scale(${browserScale})`,
            opacity: browserSpring,
          }}
        >
          <BrowserMockup
            url="claude.ai"
            browser="chrome"
            theme="light"
            width={580}
            height={380}
            shadow
            tabTitle="Claude"
          >
            <Img
              src={CHAT_IMG}
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
            />
          </BrowserMockup>
        </div>

        {/* Phone mockup */}
        <div
          style={{
            position: "absolute",
            right: 0,
            bottom: -30,
            transform: `translateY(${phoneY}px) rotate(${phoneRotate}deg)`,
            opacity: phoneSpring,
          }}
        >
          <PhoneMockup
            device="iphone-15"
            color="black"
            shadow
            scale={0.42}
          >
            <div
              style={{
                width: "100%",
                height: "100%",
                background: "#FAF9F5",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                gap: 12,
                padding: 20,
              }}
            >
              <div
                style={{
                  width: 32,
                  height: 32,
                  borderRadius: "50%",
                  background: "linear-gradient(135deg, #D97757, #F4A886)",
                }}
              />
              <div
                style={{
                  fontSize: 14,
                  fontWeight: 600,
                  color: "#141413",
                }}
              >
                Claude Mobile
              </div>
              <div
                style={{
                  width: "80%",
                  height: 8,
                  borderRadius: 4,
                  background: "#E8E7E4",
                }}
              />
              <div
                style={{
                  width: "60%",
                  height: 8,
                  borderRadius: 4,
                  background: "#E8E7E4",
                }}
              />
            </div>
          </PhoneMockup>
        </div>
      </div>
    </AbsoluteFill>
  );
};
