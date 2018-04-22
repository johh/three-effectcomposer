const puppeteer = require( 'puppeteer' );
const path = require( 'path' );


const htmlEnv = path.resolve( './test/utils/env.html' );
let browser;
let waitingTest;
let browserPage;


function run( { test: _test, callback } ) {

	if ( browserPage ) {

		browserPage.evaluate( _test ).then( ( result ) => {

			callback( result ? new Error( result.message ) : result );

		} );

	} else {

		waitingTest = {
			test: _test,
			callback,
		};

	}

}


function end() {

	browser.close();

}


puppeteer.launch( {
	args: [
		'--disable-web-security',
		'--disable-dev-shm-usage',
		'--reduce-security-for-testing',
	],
	headless: false,
} ).then( async ( _browser ) => {

	browser = _browser;
	const page = await browser.newPage();
	await page.goto( `file://${htmlEnv}` );

	browserPage = page;

	if ( waitingTest ) {

		run( waitingTest );

	}

	// await browser.close();

} );


module.exports = {
	run,
	end,
};
