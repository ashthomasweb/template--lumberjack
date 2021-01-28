# Project Name
> LumberJack setup documentation. This is a text-only version, head to (www.lumberjack.ashthomasweb.com/blog) for styled version.


## Table of contents
* [Welcome](#welcome)
* [Get Hosting](#Get-Hosting)
* [Creating/Importing your brand](#Creating-or-importing-your-brand)
* [Prismic Setup Guide](#Prismic-Setup-Guide)
* [Sign-up and get started](#Sign-up-and-get-started)
* [Copy JSON into Prismic](#Copy-JSON-into-Prismic)
* [Options are unlimited](#Options-are-unlimited)
* [Prismic summary](#Prismic-summary)
* [NodeMailer Setup](#NodeMailer-Setup)
* [Now That You're Hosted](#Now-That-You're-Hosted)
* [Templating email responses](#Templating-email-responses)
* [Curator and ShareThis Setup](#Curator-and-ShareThis-Setup)
* [All your networks in one place](#All-your-networks-in-one-place)
* [Connect your share buttons](#Connect-your-share-buttons)



## Welcome
If you haven't used Prismic, Curator, or Nodemailer before, check out the blog for articles guiding you through the
process. Setting up the accounts is straight-forward and easy, can be done from any device, and costs nothing. In order
to connect your content accounts and email you will have to edit some code files where indicated.

## Get Hosting
So you've setup Prismic and Curator, now what? You need to pick a host and get your project folder uploaded and live.
Many times, depending on the hosting provider, they can help migrate your site. Once you are hosted you can connect your
email provider to NodeMailer. Don't worry, even if you've never done this before, with a little effort and perhaps a
customer service chat you can get this done.

Each host is going to be a little bit different. Do your research about how to connect to your host, whether it be
through FTP, SSH, or a browser, make sure you pick a host that accommodates your comfort level. LumberJack uses a
Node.js runtime and Express server. Your host will need to support Node.js applications, and you will need to be able to
set one up on your own or reach out about migration services. No matter where you go, you will need to set your
environment variables, and make sure not to upload your .env file in the root directory to your server. Don't know what
that is? Read up on how to keep your information safe before going live.

Look for **LumberJack-Setup** in code files.

## Creating or importing your brand
LumberJack uses a color theme focusing around two brand colors and greyscale copy framing. I recommend picking two
contrasting colors that speak about your brand. From there, you need to generate three additional shades of color from
each brand color. LumberJack depends on these shades being complimentary to each other and within the same color family.

Experiment outside of these guidelines at your own risk! As you can see with the default styling, there are several
greens and several browns, all derived off of a 'primary-color' and a 'secondary-color'. The names of the root variables
in /public/css/theme.css should help you pick shades.

If you have made it this far...you can make it the rest of the way. Pick some fonts, find a pattern for the body
background, and choose some artwork. Upload your logo and favicon, and get to placing content on your pages.



## Prismic Setup Guide
Let Prismic's Headless CMS do the heavy-lifting on image storage, compression, and delivery. Simply upload your media,
compose your text, and let your ideas out for the world to find. Setup is easy, let's get started.

A couple things about publishing with Prismic. This is where you will construct your posts. Once published, they will be
live on your site immediately, you don't have to lift a finger. But in order to do that you first need to sign up at
Prismic.io, create a new 'custom type', and copy the contents of a file to a browser window in your Prismic dashboard.

## Sign-up and get started
Head to Prismic.io and complete the sign-up process. Once logged in, you will need to create a new repository. A
repository is a place where you will store all of the post content be it copy that you have written, images, and other
media. Once into your dashboard, click the green 'Create Repository' button. Fill in the fields and select your role and
the technology that you will be using to display the content. You have the option of upgrading to a paid-tier with
support for multiple users and more bandwidth. Once you have a new repo created, click on it to begin populating the
blog.

You will be asked to select the primary language, and then to create a custom type. 'Type' is what Prismic calls a
repeatable template that you can use for pages or posts. LumberJack only uses Prismic for it's blog posts. Click on
'Create custom type', then click 'Repeatable Type', and enter 'post', without quotes, as the custom type name. The API
field will automatically fill in, leave it as is.

## Copy JSON into Prismic
Next is where you are going to copy in the data from the supplied /templateJSON.json file that is in the LumberJack's
root directory.

In the Prismic custom type editor, in the right-hand column, click 'JSON editor'.
Copy everything in the /templateJSON.json file.
Delete everything in the Prismic JSON editor.
Paste the contents of /templateJSON.json into the Prismic JSON Editor.
Click 'Save'.
You now have the template that is used in the /views/post.ejs file, and the main blog feed.

## Options are unlimited
If you want to create a new custom type in Prismic or modify the supplied post type, you will need to appropriately edit
the markup on your own. If you make your own you will need to use the API to destructure the data. First, make your new
custom type in the Prismic window and create a new document using this type that uses at least one of every repeatable
item. You will not be able to use the API browser to destructure without first creating a new document with every
element you included in your custom type.

Once complete, navigate to the main repository screen click the settings gear in the lower left corner, then 'API &
Security', then under 'API browser' follow the link. You will be taken to a new window, simply click 'Search Documents'
at the bottom, and you can then access the content via HTML or pure JSON for destructuring.

If you are using the supplied post template, simply click the green pencil icon near the top-right of the documents
window in your repository. If you have more than one custom type, select 'post'. This template has a main image, title,
and description that must be filled out on every post, or the post will not load. Below that are buttons that generate
repeatable zones for text, headings, or other content. You can use as many or as few of these in each post as you like.

There is a whitespace zone that allows you to enter CSS margin values in as native code without brackets to adjust your
content. By default all heading elements will sit closer to paragraph elements than others. Use the whitespace zone to
change this to your liking. There are basic instructions built into the fields to follow, such as pasting just one
paragraph into a repeatable zone at a time, or character length limits. This is a function of how LumberJack's default
post template is written, you can use your own parameters if you are writing your own custom type.

## Prismic summary
Don't forget to copy the contents of /templateJSON.json in your root directory into the Prismic JSON editor. If you
decide to make changes to the Prismic content-type, you will need to update the appropriate EJS tags in /views/post.ejs.
If you create a new content-type, you will need to create a new .ejs file in your /views/ directory and create new
markup according to your custom type data. Prismic's API endpoint is straightforward, just make sure you take note of
what you are naming your custom types, or use the API endpoint in your account settings.



## NodeMailer Setup
If you haven't used NodeMailer before, don't worry, even though you will be editing some things on the back-end of the
site it's straight-forward, and that's what version control is for anyway. If this is your first time, make sure you are
using effective versioning. You're going to need a host and an email provider before setup and testing.

## Now That You're Hosted
You need to connect NodeMailer in the backend of the site. In order to do this you need to decide on an email provider,
usually your host or a major provider like gmail, and fill in the appropriate authentication details to the 'Mailer
transport object' in the /nodemailer.js file in your root directory. In this file you will also be able to write either
a plain text or an HTML email template.

You will need to place your environment variables (username and password for email provider) in the .env file located in
the root directory. Do not upload this file to your host. Once hosted, you will provide your host with the same values.
Most hosts have a dedicated section for doing so. They can be placed in your .htaccess file, or assigned using the
cPanel Node.js App Manager. Check with your hosting provider for more specifics.

## Templating email responses
LumberJack ships setup to automatically send 2 emails through SMTP, one to the person in charge of inquires for your
business, and one confirmation email to the person who made the request. You can automatically send as many emails out
per request as you want, however, if you are sending more than 2 you will need to make some small changes in the /app.js
file as well as the /nodemailer.js file.

If you are sticking with the two automatic emails, one to you, one to the client, then all you need to do is open up
/nodemailer.js. In the 'Mailer transport object' you will need to supply your own email host information. Nodemailer
works well with google OAuth as long as your host allows for external SMTP email services.

In the 'Templates' section, you will find the two templates currently in use and a commented out template you can use as
an example to generate more emails. You will find detailed instructions in the appropriate places in the code file.

Make sure to test your setup to ensure that your host does not block external SMTP connections, and that it isn't being
caught by a spam filter. The error handler doesn't handle SMTP bounce-back or spam filtering, only errors within the
NodeMailer transport object and authentication. Beware that sometimes running a lot of tests at once with generic text
can trigger an automatic spam filter.



## Curator and ShareThis Setup
In this post you will learn about Curator as well as how to setup your social media share buttons from ShareThis.
Curator is an aggregator, meaning that it draws content from various places and combines it into a single feed. You can
log in and organize the content as you see fit, and can use up to three individual networks on the free-tier. If you
upgrade to a paid tier, you have the ability to make and edit posts (including Instagram) right from your Curator
Dashboard.

## All your networks in one place
Let's get you setup with Curator. Head on over to Curator.io and sign up for a new account. It's super easy.

Once you are in your Dashboard, you will be asked to select the social media site you want to pull content from.
Remember that the free-tier only allows for three networks to be added. Follow the prompts to pull content from the
appropriate channel or feed.

Curator calls the networks you pick a 'Source'. When you pick your first source you will automatically be taken to the
'Curate' tab, where you can decide which posts will be included in your feed. Once satisfied with your choices, you have
some styling options.

Look for **LumberJack-Setup** in code files.

If you are using Instagram, and want the Curator feed to appear in the LumberJack style as you see on the Media page,
you need to set the feed style in the following manner. This is important. If you don't input these settings the
LumberJack carousel will not display correctly.

The 'Feed Style' needs to be set to 'Grid - Sydney'.
Under the 'Feed' tab, enter '1' for 'Rows'.
Enter '310' for 'Min post width'.
Publish and copy the code into your header.ejs
That's it! Click 'Save', then 'Publish Feed'. A popup will appear, all you need to do is copy one single line of code.
Look for the line that starts: 'i.src = "https://cdn.curator....'.
Copy the entire line and replace the corresponding line in your /views/partials/footer.ejs file.
If you renamed your default feed in your Curator Dashboard, you will also have to rename the appropriate HTML element id
in /views/media.ejs. If you are putting additional feeds on your site, you will need to copy code supplied from Curator
once you publish and then add markup for the additional feeds in your /views/partials/footer.ejs.

## Connect your share buttons
Head over to www.sharethis.com and signup for your free account. The first thing you will do once you signup is enter
the domain name of your site. The LumberJack theme uses the 'Inline Share Buttons' - click the button to enable them,
and click customize. In the next screen you need to pick your social networks. Enable the following options to
seamlessly integrate with the LumberJack share menu.

Set the 'Alignment' to 'center'.
Set 'Size' to 'small'.
'Labels' to 'call to action'.
'Color' to 'social'.
Set 'Counts' to 'off'.
Set the 'Corner' slider to be directly under the 'e' in 'Corner' (sorry, no specific pixel adjustment here).
Under 'Extras' you want to 'add spacing'.
Click 'Update'.
You will need to paste the code supplied from the 'Code activation' button into your <head> in the /views/partials/header.ejs file. 
Once you paste it into your site, you will need to click the 'Code Activation' button and ShareThis will verify your domain. 
That's it! You can now populate the meta tags in your <head> with your business information.

END of document