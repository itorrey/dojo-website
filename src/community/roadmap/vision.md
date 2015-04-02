# Dojo 2 Vision

## A Quick Dojo 1.x history
The Dojo Toolkit began in 2004 by a group of like-minded JavaScript engineers that were tired of reinventing the wheel and hacking around browser inconsistencies.

The mission of the Dojo Toolkit has been to: Provide consistent and easy to use features and APIs that allow developers to create maintainable web apps faster and easier without having to worry about the inconsistencies and quirks of each browser.

We released Dojo 1.0 in 2007 and have iterated heavily on the 1.x line since, introducing concepts that are now becoming mainstream in JavaScript development. At the time using JavaScript modules, promises/deferreds, CSS preprocessors and a build system was perceived by many as being complicated and unnecessary. As we know, these things are an expected part of JavaScript development today and we’re very excited that the majority of JavaScript engineers are now approaching development in this way.

## Core Principles

We’ve spent a lot of time thinking about what a next generation JavaScript toolkit needs. It’s not enough to just add features, increment the version number and call it “Dojo 2”.  There has to be a set of core principles guiding the development. The JavaScript ecosystem has grown exponentially since Dojo began. The mission of the toolkit remains the same but how it’s accomplished will be much different.

## Modularity

The prevailing ‘wisdom’ in popular JavaScript (this week) is that everything that can be split into a separate package should be. The theory being that if all you need is basic DOM manipulation and event handling you can grab a package that does only that.

This works great for smaller initiatives but as requirements grow and complexity increases, more packages from more sources are added to the project. The utopian idea that you can just swap out a package for another one later on if you want to is quickly realized to be more theory than reality.

When building software for large corporations, it’s often impossible to operate this way as their legal teams demand clean intellectual property and that code is reviewed and accepted by legal before use.

Our approach with Dojo 2 is to hit the sweet spot between separate packages and a unified Dojo Toolkit release. We will develop, package and release core Dojo functionality with packages such as dgrid, dstore and Intern. Developers will be free to use and upgrade the parts they want independently or use the packaged Dojo Toolkit release.

Breaking up Dojo ‘just enough’ will allow others to contribute more easily and releases to happen faster and much less painfully.

## Leverage the Ecosystem

Dojo may have paved the way on a lot of fronts, but given the proliferation of JavaScript micro libraries and tooling there’s often no reason to hang on to and maintain our own solution just because it’s ours. Where there is comparable or better license compatible code available, we will look to use it. For example, we will document the source code with JSDoc rather than our custom solution, DojoDoc, which predated JSDoc.

## Better Documentation

Speaking of documentation, our documentation efforts with Dojo 1 improved over time, but are not up to the standards we have for Dojo 2. A large part of this was due to the friction caused by the lack of tooling. By utilizing modern solutions like JSDoc, Markdown and GitHub, we can increase both the quality of documentation and the speed to add and update docs.

## Continue to Push JavaScript Forward

Firstly, Dojo 2 will be written in TypeScript. While ES6/ES2015 offers some much needed improvements, there are many unfinished things. Languages like TypeScript allow us to add extensions to improve JavaScript, before they are added to the language. Then we can easily compile/transpile to JavaScript in AMD, CJS, or ES6 module formats. This allows us to improve the language itself, but more importantly, improve your productivity.

## Modern Environments

In addition to ‘Desktop’ browsers, Dojo 2’s goal is to support as many modern environments that can interpret JavaScript as possible. That means mobile phones, tablets, Node.js / io.js, VR headsets and more.

# The Plan
To ensure that what’s built is both what’s needed and consistent across the toolkit, we are working on each part of Dojo 2 in phases.

1.	**Define.**
Define the functionality and the API surface area to create a high level ‘specification’ for each Dojo 2 package.

2. **Develop.**
Using the high level specification, develop and document the functionality and use Intern to validate that it’s working.

3. **Release.**
Dojo 2 will be a packaged collection of these various modules. As we complete each module we are closer to the Dojo 2.0 release.