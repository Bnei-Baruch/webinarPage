<?php
	set_include_path(get_include_path() . PATH_SEPARATOR . '.;c:\wamp\www\webinar\server\google-api-php-client\src');

	// Call set_include_path() as needed to point to your client library.
	require_once '/Google/autoload.php';
	require_once '/Google/Client.php';
	require_once '/Google/Service/YouTube.php';
	echo "string";
	//session_start();
	/*
	 * You can acquire an OAuth 2.0 client ID and client secret from the
	 * {{ Google Cloud Console }} <{{ https://cloud.google.com/console }}>
	 * For more information about using OAuth 2.0 to access Google APIs, please see:
	 * <https://developers.google.com/youtube/v3/guides/authentication>
	 * Please ensure that you have enabled the YouTube Data API for your project.
	 */
	$OAUTH2_CLIENT_ID = '859383625048-jro1lhhav6kuic1omcuk1qp3t0scqjh7.apps.googleusercontent.com';
	$OAUTH2_CLIENT_SECRET = 'bcJQWHwb6zGUZZP-T8bhOV5z';
	
	$client = new Google_Client();
	$client->setClientId($OAUTH2_CLIENT_ID);
	$client->setClientSecret($OAUTH2_CLIENT_SECRET);
	$client->setScopes('https://www.googleapis.com/auth/youtube');
	$redirect = filter_var('http://' . $_SERVER['HTTP_HOST'] . $_SERVER['PHP_SELF'], FILTER_SANITIZE_URL);
	$client->setRedirectUri($redirect);
	$youtube = new Google_Service_YouTube($client);
	print_r( $youtube );
	$broadcastsResponse = $youtube->liveBroadcasts->listLiveBroadcasts(
        array(
            'part' => 'snippet',
            'broadcastStatus' => 'all',
            'id' => 'UCAhq4ttjWzWAT4zmPXm0DZw'
        )
    );

    /*$streamsResponse = $youtube->liveStreams->listLiveStreams('id,snippet', array(
        'mine' => 'true',
    ));
*/
	print_r( $broadcastsResponse);
	return;


?>