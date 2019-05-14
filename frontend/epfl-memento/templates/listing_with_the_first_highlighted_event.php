<?php
    function epfl_memento_listing_with_the_first_highlighted_event($results, $memento_name) {

        $memento_url = "https://memento.epfl.ch/" . $memento_name;
        $display_first_event = TRUE;
        $nb_events = count($results);

        $markup = '<div class="container my-3">';
        $markup .= '<div class="row align-items-center">';
        $markup .= '<div class="col-md-6">';
        $markup .= '<h2>' . __('Next events', 'wp-gutenberg-epfl') . '</h2>';
        $markup .= '</div>';
        $markup .= '<div class="col-md-6 text-right">';
        $markup .= '<a href="' . esc_url($memento_url) . '">' . esc_html('See all events', 'epfl') . '</a>';
        $markup .= '</div>';
        $markup .= '</div>';
        $markup .= '<div class="row mt-2">';

        if (!(bool) $results) {
            $markup .= '<div><h3>';
            $markup .= esc_html("No scheduled events", "epfl");
            $markup .= '</h3></div>';
        }

        $count = 1;
        foreach($results as $event) {
            
            $is_first_event = ($count == 1);
            $visual_url = get_visual_url($event, $memento_name);

            if ($is_first_event and $display_first_event) {
                $markup .= '<div class="col-md-6">';
                $markup .= '<a href="' . esc_url($event->event_url) .'" class="card card-gray link-trapeze-horizontal" itemscope itemtype="http://schema.org/Event">';
                $markup .= '<div class="card-body">';
                $markup .= '<picture class="card-img-top">';
                $markup .= '<span style="position: absolute; color: #FFF;padding: 10px 0 0 10px; line-height: 1.35em;font-size:2em;">';
                $markup .= '<meta itemprop="eventStatus" content="https://schema.org/EventCancelled">';
                if ($event->lang == 'fr') {
                    $markup .= esc_html($event->academic_calendar_category->fr_label);
                } else {
                    $markup .= esc_html($event->academic_calendar_category->en_label);
                }
                $markup .= '</span>';
                $markup .= '<img src="' . esc_url($visual_url) . '" class="img-fluid" title="' . esc_attr($event->image_description) . '" alt="' . esc_attr($event->image_description) .'" />';
                $markup .= '</picture>';
                $markup .= '<h3 class="card-title" itemprop="name">' . esc_html($event->title) . '</h3>';
                $markup .= '<p>' . esc_html(trim_text(strip_tags($event->description), 225)) . '</p>';
                $markup .= '<div class="card-info">';
                $markup .= include(dirname(__FILE__) . '/includes/card-info.inc.php');
                $markup .= '</div>';
                $markup .= '</div>';
                $markup .= '</a>';
                $markup .= '</div>';
                $markup .= '<div class="col-md-6">';
                $markup .= '<div class="list-group">';
            } else {
                $markup .= '<a href="' . esc_url($event->event_url) . '" class="list-group-item list-group-item-gray list-group-teaser link-trapeze-vertical" itemscope itemtype="http://schema.org/Event">';
                $markup .= '<div class="list-group-teaser-container">';
                $markup .= '<div class="list-group-teaser-thumbnail">';
                $markup .= '<picture class="card-img-top">';
                $markup .= '<span style="position: absolute; color: #FFF;padding: 10px 0 0 10px; line-height: 1.35em;font-size:1em;">';
                $markup .= '<meta itemprop="eventStatus" content="https://schema.org/EventCancelled">';
                if ($event->lang == 'fr') {
                    $markup .= esc_html($event->academic_calendar_category->fr_label);
                } else {
                    $markup .= esc_html($event->academic_calendar_category->en_label);
                }
                $markup .= '</span>';
                $markup .= '<img src="' . esc_url($visual_url) . '" class="img-fluid" title="' . esc_attr($event->image_description) . '" alt="' . esc_attr($event->image_description) .'" />';
                $markup .= '</picture>';
                $markup .= '</div>';
                $markup .= '<div class="list-group-teaser-content">';
                $markup .= '<p class="h5 card-title" itemprop="name">' . esc_html($event->title) . '</p>';
                $markup .= '<div class="card-info mt-0">';
                $markup .= include(dirname(__FILE__) . '/includes/card-info.inc.php');
                $markup .= '</div>';
                $markup .= '</div>';
                $markup .= '</div>';
                $markup .= '</a>';
            }
            if ($count === $nb_events and $display_first_event) {
                $markup .= '</div>';
                $markup .= '</div>';
            }
            $count++;
        }
  
        $markup .= '</div>';
        $markup .= '</div>';

        return $markup;
    }
