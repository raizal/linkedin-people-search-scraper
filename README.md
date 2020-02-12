# Linkedin-People-Scraper

Simple search people scraper using Puppeteer

### Installation

Requires Yarn to run.

Install the dependencies and devDependencies and start the server.

```sh
$ git clone https://github.com/raizal/linkedin-people-search-scraper.git && cd linkedin-people-search-scraper
$ yarn install
```

### How to use

###### command
#
```sh
$ yarn start "keyword" page cookie
```

keyword = your search keyword
page =  how many page you want to open
cookie = your login cookie

To use this, you need to have your Linkedin cookies.

### How to get auth cookie
##### Chrome
- Login to your Linkedin, then open DevTools
- Choose Application tab
- on side menu, choose Cookies and select the first item (it should be https://www.linkedin.com/)
- find item with name 'li_at', copy the value

###### Example Usage: 
#
```sh
$ yarn start "javascript" 10 "ASDASJNDKASNDKJN!@#!@#(!@*($*!IJSADKASLKDLAKSDLJn)""
```
