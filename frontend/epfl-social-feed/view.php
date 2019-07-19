<?php
    $twitter_url      = get_query_var('epfl_social_feed_twitter_url');
    $instagram_url    = get_query_var('epfl_social_feed_instagram_url');
    $facebook_url     = get_query_var('epfl_social_feed_facebook_url');

    # build a [url, template path] array
    $social_feed_data = [
      [$twitter_url, dirname(__FILE__).'/twitter_view.php'],
      [$instagram_url, dirname(__FILE__).'/instagram_view.php'],
      [$facebook_url, dirname(__FILE__).'/facebook_view.php'],
    ];
?>
<div class="container my-3">
  <div class="social-feed-group justify-content-center">
    <?php foreach ($social_feed_data as $social_feed): ?>
      <?php if (!empty($social_feed[0])): ?>
    <div class="social-feed-container">
      <?php load_template($social_feed[1]); ?>
    </div>
      <?php endif; ?>
    <?php endforeach ?>
  </div>
</div>
