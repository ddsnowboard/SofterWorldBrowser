SofterWorldBrowser
=========

An Android application that lets you view A Softer World. Inspired by my personal favorite comic viewer, the bygone XKCDViewer. 

Usually, specs have a section for use cases, but this is pretty obvious. This app is for someone who wants to read A Softer World in a fast and easy-to-use format on their phone. The website doesn't have a mobile version, to my knowledge, and even if someone did use it, they wouldn't be able to see the alt-text, and the arrows to move forward and back move all over the screen, which I think is not very good for usability. XKCDViewer was very fast to use, and worked well on many types of phones. In short, I liked it because you could switch comics fast without having to press a bunch of strangely changing and slow buttons, and that's what I aim to do with this application. 


####Main Screen

There will be one screen that the user always sees when they start up the app, the Main Screen. It will show the newest comic, along with some navigation buttons. There could be a setting to change which comic it starts on, either the newest one or the last one you were looking at when you left the app, but at the start it will be the newest one. There will be three buttons on the bottom, a left arrow that goes one comic back, then a question mark in the middle that takes you to a random comic, and a right arrow that takes you right. The arrow buttons will not do anything if there are no more comics that they can take you to, but the random button will of course always do something. The only other things on this page will be the title of the comic at the top, in a font large enough that the user will notice, and the functionality to tap on the comic image to show the alt-text. 

The viewer window itself will be a little more complicated. It will be scrollable and zoomable. I don't know if there is a built-in Android class for this or if I'll have to make something myself, but it will have to be scrollable and zoomable. I will also have to figure out how to make the default zoom so that something intelligable comes up when you first load the comic, but I'll only really be able to do that when I have more code written and I can test. 

>Techincal Note: I think that I can use a WebView for this. That would be nice and easy.
