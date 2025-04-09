/*!
 * DashCore - SaaS, App & Software Website template.
 * Main Javascript file
 *
 * This files serves as the main entry for all components (scripts and styling)
 * You should edit according to your own needs, remove the components you won't need (use) is recommended in order to get a smaller final bundle file
 * Author:  http://themeforest.net/user/5studiosnet
 * Copyright © 2024 5Studios.net
 * https://5studios.net
 **/

import 'bootstrap';
import './feather.js';

// GENERAL JS AND STYLES
// FontAwesome used icons
import './font-awesome.js';
import './aos.js';

// Core components
import './navbar.js';
import './main-menu.js';
import './scrolling.js';
import './scroll-to-top.js';
import './background.js';

// Theme toggler
import './theme-toggler';

// Initializing of the scripts used across the site
// Feel free to edit this section, you can add additional scripts you might need or remove what you won't use

import './swiper.js';
import './typed.js';
import './pricing.js';
import './lightbox.js';
import './syntax-highlighter.js';
import './counters.js';
import './forms.js';
//import './wizard.js';
import './simplebar.js';

// For 'saas' page
import './perspective-mockups';

// For 'integration' page
import './integration-bubbles';

// Import styles at the end, so default plugins styles can be overridden when needed
import '../sass/dashcore.scss';
