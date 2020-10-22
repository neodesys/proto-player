/**
 * Proto-Player
 *
 * Copyright (C) 2020, Loïc Le Page
 * Released under the MIT license.
 */

import css from "./style.css";

const maxTimestamp = 10.0;

export default class Player extends HTMLElement
{
    static get observedAttributes()
    {
        return ["src"];
    }

    constructor()
    {
        super();
        const shadowRoot = this.attachShadow({ mode: "closed" });

        shadowRoot.innerHTML = `
        <style>${css.toString()}</style>
        <div class="wrapper">
            <div class="overlay">
                <h2>To keep on watching this video, please enter your email address below:</h2>
                <form>
                    <input type="email" placeholder="Enter your email..." />
                </form>
            </div>
            <video controls controlslist="nofullscreen nodownload noremoteplayback" autoplay playsinline muted disablePictureInPicture disableRemotePlayback></video>
        </div>`;

        this._emailSent = false;
        this._videoElement = shadowRoot.querySelector("video");
        this._overlayElement = shadowRoot.querySelector(".overlay");
        this._inputElement = this._overlayElement.querySelector("input");

        this._inputElement.parentElement.onsubmit = (e) =>
        {
            e.preventDefault();
            const email = this._inputElement.value;
            if (email)
            {
                // TODO: send email to server
                window.alert(`Registering email: ${email}`);

                this._emailSent = true;
                this._inputElement.value = "";
                this._overlayElement.style.display = "none";
                this._videoElement.play();
            }
        };

        this._videoElement.addEventListener("timeupdate", () =>
        {
            if (!this._emailSent && (this._videoElement.currentTime > maxTimestamp))
            {
                this.showEmailForm();
                this._videoElement.currentTime = maxTimestamp;
            }
        });
    }

    showEmailForm()
    {
        this._videoElement.pause();
        this._overlayElement.style.display = "block";
        this._inputElement.focus();
    }

    attributeChangedCallback(name, oldValue, newValue)
    {
        if ((name === "src") && (newValue !== oldValue))
        {
            this._emailSent = false;
            this._inputElement.value = "";
            this._overlayElement.style.display = "none";
            this._videoElement.src = newValue;
            this._videoElement.currentTime = 0;
            this._videoElement.play();
        }
    }
}
