import * as React from "react";
import { NUMBERS, ALPHABET } from "./constants";

const lengthRange = [4, 5, 6, 7, 8] as const;
type TLength = typeof lengthRange[number];

interface IUserOpt {
  type: "mixed" | "numeric" | "alpha";
  length?: TLength;
  sensitive?: boolean;
  width?: number;
  height?: number;
}

interface ReturnValue {
  gen: () => void;
  validate: (string: string) => boolean;
}

export default function useOfflineCaptcha(
  ref: React.RefObject<HTMLElement>,
  UserOpt: IUserOpt
): ReturnValue {
  const [captcha, setCaptcha] = React.useState<ReturnValue>();

  React.useEffect(() => {
    if (!ref.current) return;

    let {
      type = "mixed",
      length = 5,
      sensitive = false,
      width = 200,
      height = 50,
    } = UserOpt;

    if (!lengthRange.includes(length)) {
      length = 5;
    }

    const element = ref.current;

    let candidates: string[] = [];
    let answer = "";

    switch (type) {
      case "numeric":
        candidates = [...NUMBERS];
        break;
      case "mixed":
        candidates = [...ALPHABET, ...NUMBERS];
        break;
      case "alpha":
      default:
        candidates = [...ALPHABET];
        break;
    }

    function getRandomNumber(min: number, max: number) {
      return Math.floor(Math.random() * (max - min + 1) + min);
    }

    function gen() {
      const prevCaptcha = document.getElementById(
        "offline-captcha-canvas-area"
      );
      if (prevCaptcha) {
        element.removeChild(prevCaptcha);
      }

      const canvas = document.createElement("canvas");

      canvas.width = width;
      canvas.height = height;
      canvas.setAttribute("id", "offline-captcha-canvas-area");
      canvas.setAttribute("style", "border: 1px solid black");
      element.appendChild(canvas);

      const ctx = canvas.getContext("2d");

      function drawLine(color: string) {
        ctx!.beginPath();
        ctx!.moveTo(0, 10 + Math.random() * canvas.height);
        ctx!.lineTo(canvas.width, 10 + Math.random() * canvas.height);
        ctx!.lineWidth = Math.random() * 1 + 1;
        ctx!.closePath();
        ctx!.strokeStyle = color;
        ctx!.stroke();
      }

      function shuffleCandidates(arr: string[]) {
        for (let i = arr.length - 1; i > 0; i--) {
          let j = Math.floor(Math.random() * (i + 1));
          [arr[i], arr[j]] = [arr[j], arr[i]];
        }
        return arr.slice(0, length);
      }

      function drawText(string: string) {
        const textFonts = ["Arial", "Georgia", "Helvetica", "Impact"];
        for (let i = 0; i < string.length; i++) {
          const space = width / string.length;
          const initial = 5;

          ctx!.font = `2rem ${
            textFonts[getRandomNumber(0, textFonts.length - 1)]
          }`;

          ctx!.fillText(
            string[i],
            initial + i * space,
            getRandomNumber(canvas.height, canvas.height - 20),
            200
          );
        }
      }

      answer = shuffleCandidates(candidates).join("");
      drawText(answer);

      ["darkgray", "red", "darkblue"].forEach((color) => drawLine(color));
    }

    function validate(string: string) {
      const regex = new RegExp(answer, `${sensitive ? "g" : "gi"}`);
      if (regex.test(string)) return true;
      return false;
    }

    setCaptcha({ gen, validate });
  }, []);

  return { ...captcha! };
}
