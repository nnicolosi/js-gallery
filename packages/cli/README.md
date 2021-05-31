# JavaScript Gallery (CLI Component)

JavaScript Gallery is a browser-based application for writing, executing, rendering, and documenting JavaScript and JSX snippets.  

This package represents the CLI Component, which is the entrypoint into the JavaScript Gallery application.  It starts up an instance of the Local API Component with the arguments (e.g. filename) specified by the user.  The Local API Component in turn serves up the compiled assets for the Local Client Component and handles the file-based persistence of any number of JavaScript galleries that the user creates and maintains.

The application is started from the command line as follows:

`$> npx js-gallery serve`

<br/>

This wll start the application with the following defaults:

| Parameter Name | Flag         | Default Value | Comment                                                  |
| -------------- | ------------ | ------------- | -------------------------------------------------------- |
| filename       | N/A          | js-gallery.js | Must include a *.js extension. Can include path as well. |
| port           | -p or --port | 4005          | Must be a valid port number, not already in use.         |

<br/>

Therefore, the command specified above is equivalent to the following command:

`$> npx js-gallery serve js-gallery.js -p 4005`

<br/>

Here is what the application looks like in the browser:

![](./images/default.png)

