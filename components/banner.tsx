import styles from "./banner.module.css";
import Image from "next/image";
import {
  MouseEventHandler,
  ReactElement,
  JSXElementConstructor,
  ReactFragment,
  ReactPortal,
} from "react";

const Banner = (props: {
  handleOnClick: MouseEventHandler<HTMLButtonElement>;
  buttonText: string;
}) => {
  return (
    <div className={`mt-3 ${styles.container} relative`}>
      <Image
        className="absolute inset-0 left-1/4"
        src="/static/hero-image.png"
        width={700}
        height={400}
        alt="hero banner"
      />

      <div className="z-10 flex flex-col gap-8 relative">
        <h1 className={`mt-3 ${styles.title}`}>
          <span className={styles.title1}>Coffee </span>
          <span className={styles.title2}>Connoisseur</span>
        </h1>
        <p className={`text-white font-bold text-3xl`}>
          Discover your local coffee shops!
        </p>

        <button
          className={`text-white bg-blue-600 p-4 w-1/4 mt-3 rounded`}
          onClick={props.handleOnClick}
        >
          {props.buttonText}
        </button>
      </div>
    </div>
  );
};

export default Banner;
