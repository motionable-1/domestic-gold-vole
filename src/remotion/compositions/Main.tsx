import React from "react";
import {
  AbsoluteFill,
  Audio,
  useCurrentFrame,
  useVideoConfig,
  Sequence,
  Artifact,
  interpolate,
} from "remotion";
import {
  TransitionSeries,
  linearTiming,
} from "@remotion/transitions";
import { loadFont } from "@remotion/google-fonts/Inter";
import { blurDissolve } from "../library/components/layout/transitions/presentations/blurDissolve";
import { slideOver } from "../library/components/layout/transitions/presentations/slideOver";
import { GridBackground } from "../library/components/effects/GridBackground";
import { IntroScene } from "./scenes/IntroScene";
import { CoworkScene } from "./scenes/CoworkScene";
import { ConnectorsScene } from "./scenes/ConnectorsScene";
import { ChatScene } from "./scenes/ChatScene";
import { CTAScene } from "./scenes/CTAScene";

const { fontFamily } = loadFont("normal", {
  weights: ["400", "500", "600", "700"],
  subsets: ["latin"],
});

const MUSIC_URL =
  "https://pub-e3bfc0083b0644b296a7080b21024c5f.r2.dev/music/1773306557463_zmsxven90bp_music_Modern__upbeat_corpo.mp3";
const SFX_WHOOSH =
  "https://pub-e3bfc0083b0644b296a7080b21024c5f.r2.dev/sfx/1773306568620_nqvdjh73oag_sfx_Soft__elegant_digital_whoosh_t.mp3";

// Scene durations (in frames at 30fps)
const INTRO_DUR = 120; // 4s
const COWORK_DUR = 165; // 5.5s
const CONNECTORS_DUR = 165; // 5.5s
const CHAT_DUR = 165; // 5.5s
const CTA_DUR = 150; // 5s
const TRANSITION_DUR = 20; // ~0.67s per transition
// Total = 120 + 165 + 165 + 165 + 150 - (20 * 4) = 685 frames

// Transition timings for SFX placement
const TRANS_1_START = INTRO_DUR - TRANSITION_DUR / 2;
const TRANS_2_START = TRANS_1_START + COWORK_DUR - TRANSITION_DUR / 2;
const TRANS_3_START = TRANS_2_START + CONNECTORS_DUR - TRANSITION_DUR / 2;
const TRANS_4_START = TRANS_3_START + CHAT_DUR - TRANSITION_DUR / 2;

/** Animated background that persists across all scenes */
const Background: React.FC = () => {
  const frame = useCurrentFrame();

  const gradientOpacity = interpolate(
    Math.sin(frame * 0.01),
    [-1, 1],
    [0.03, 0.06]
  );

  return (
    <AbsoluteFill>
      {/* Base warm cream */}
      <AbsoluteFill style={{ background: "#FAF9F5" }} />

      {/* Subtle dot grid */}
      <GridBackground
        style="dots"
        cellSize={32}
        color="rgba(20, 20, 19, 0.04)"
        lineWidth={1}
        animate
        velocity={8}
        direction="up"
        fadeEdges
      />

      {/* Radial gradient accent */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: `radial-gradient(circle at 30% 25%, rgba(26, 115, 232, ${gradientOpacity}) 0%, transparent 50%), radial-gradient(circle at 75% 70%, rgba(217, 119, 87, ${gradientOpacity * 0.8}) 0%, transparent 45%)`,
          pointerEvents: "none",
        }}
      />

      {/* Top subtle vignette */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "radial-gradient(ellipse at center, transparent 60%, rgba(250,249,245,0.8) 100%)",
          pointerEvents: "none",
        }}
      />
    </AbsoluteFill>
  );
};

export const Main: React.FC = () => {
  const frame = useCurrentFrame();
  const { durationInFrames } = useVideoConfig();

  return (
    <AbsoluteFill style={{ fontFamily }}>
      {/* Thumbnail artifact */}
      {frame === 0 && (
        <Artifact content={Artifact.Thumbnail} filename="thumbnail.jpeg" />
      )}

      {/* Persistent animated background */}
      <Background />

      {/* Scene transitions */}
      <TransitionSeries>
        <TransitionSeries.Sequence durationInFrames={INTRO_DUR}>
          <IntroScene />
        </TransitionSeries.Sequence>

        <TransitionSeries.Transition
          presentation={blurDissolve()}
          timing={linearTiming({ durationInFrames: TRANSITION_DUR })}
        />

        <TransitionSeries.Sequence durationInFrames={COWORK_DUR}>
          <CoworkScene />
        </TransitionSeries.Sequence>

        <TransitionSeries.Transition
          presentation={slideOver("left")}
          timing={linearTiming({ durationInFrames: TRANSITION_DUR })}
        />

        <TransitionSeries.Sequence durationInFrames={CONNECTORS_DUR}>
          <ConnectorsScene />
        </TransitionSeries.Sequence>

        <TransitionSeries.Transition
          presentation={blurDissolve()}
          timing={linearTiming({ durationInFrames: TRANSITION_DUR })}
        />

        <TransitionSeries.Sequence durationInFrames={CHAT_DUR}>
          <ChatScene />
        </TransitionSeries.Sequence>

        <TransitionSeries.Transition
          presentation={slideOver("left")}
          timing={linearTiming({ durationInFrames: TRANSITION_DUR })}
        />

        <TransitionSeries.Sequence durationInFrames={CTA_DUR}>
          <CTAScene />
        </TransitionSeries.Sequence>
      </TransitionSeries>

      {/* Background music */}
      <Audio
        src={MUSIC_URL}
        volume={(f: number) =>
          interpolate(
            f,
            [0, 30, durationInFrames - 60, durationInFrames],
            [0, 0.25, 0.25, 0],
            {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
            }
          )
        }
      />

      {/* Transition SFX */}
      <Sequence from={Math.round(TRANS_1_START)}>
        <Audio src={SFX_WHOOSH} volume={0.12} />
      </Sequence>
      <Sequence from={Math.round(TRANS_2_START)}>
        <Audio src={SFX_WHOOSH} volume={0.1} />
      </Sequence>
      <Sequence from={Math.round(TRANS_3_START)}>
        <Audio src={SFX_WHOOSH} volume={0.12} />
      </Sequence>
      <Sequence from={Math.round(TRANS_4_START)}>
        <Audio src={SFX_WHOOSH} volume={0.1} />
      </Sequence>
    </AbsoluteFill>
  );
};
