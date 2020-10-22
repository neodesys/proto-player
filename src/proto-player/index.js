/**
 * Proto-Player
 *
 * Copyright (C) 2020, Loïc Le Page
 * Released under the MIT license.
 */

import Player from "./player";

const elementTag = "proto-player";
if (!window.customElements.get(elementTag))
{
    window.customElements.define(elementTag, Player);
}
