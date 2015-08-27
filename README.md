# README

## Features

- HTML5 templated index.htm
- Latest stable releases wired in (using Bower): Twitter Bootstrap 3, jQuery, Modernizr
- Gulp setup with the following setup:
    - SCSS compiling using libsass (including autoprefixer)
    - Javascript minification and ready-to-enable concat
    - Image optimisation using imagemin
    - Auto-refreshing dev server using gulp-connect
    - OS-level notification of errors & config so that the watcher continues running
- Gitignore file setup for NodeJS, Python, and Webstorm

## Installation

1. Clone the project 
    ```bash
    git clone https://github.com/meetbryce/frontend-boilerplate.git
    ```
2. Install NodeJS dependencies 
    ```shell
    npm install
    ```

## Usage

1. Compile files, start watching files, and start dev server 
   ```sh
   npm start
   ```
2. Open the dev server in your brower [localhost:8080](localhost:8080) also available on the network using ComputerName.local

## License

meetbryce/frontend-boilerplate is released under the MIT license.

**Would love to know if you've found my repo useful via twitter - [@meetbryce](http://twitter.com/meetbryce)**


## Recommended External Tools (work in progress)

- [TotalTerminal](http://totalterminal.binaryage.com/) (free) - allows you to access your terminal with a shortcut
- [TotalFinder](http://totalfinder.binaryage.com/) ($9) - allows you to access your finder with a shortcut, gives you a shortcut to reveal dotfiles, and have folders always appear at the top in list view
- [ClipboardHistory](https://itunes.apple.com/us/app/clipboard-history/id420939835?mt=12) ($4.99) - keeps a history of your clipboard with an easy to use interface and a shortcut for converting rich text to plain text
- [Sublime Text 3](https://www.sublimetext.com/3) (free beta) - used ST for 3 years or more and love it.
- [Jetbrains Webstorm](https://www.jetbrains.com/webstorm/) ($49) - fully-fledged IDE, I've only been using it for about a week but I'm really liking it already.


## Future Plans

Below is a rough outline of things I want to integrate or consider integrating into this repo.

- [x] `npm-shrinkwrap` rather than clunky `nvm`
- [ ] ESLint/JSCS config file rather than just managing this in Webstorm 
- [ ] Browserify to better manage JS concatenation and dependencies. Would require removing Bower.
- [ ] AngularJS, already have my boilerplate for this but still investigating ReactJS (mostly because Google isn't dogfooding Angular)
- [ ] Testing framework
