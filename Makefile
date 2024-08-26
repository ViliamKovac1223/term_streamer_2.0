VIDEO_JS_LOCATION = src/wwwroot/videojs

init:
	# Download videojs zip
	wget https://github.com/videojs/video.js/releases/download/v8.17.3/video-js-8.17.3.zip
	# Clean videojs location
	rm -rf $(VIDEO_JS_LOCATION)

	# Unzip vidoejs into right location
	mkdir -p $(VIDEO_JS_LOCATION)
	unzip video-js-8.17.3.zip -d $(VIDEO_JS_LOCATION)

	# Remove videojs zip
	rm video-js-8.17.3.zip

watch_scss:
	sass --watch src/wwwroot/style/
