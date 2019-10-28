<?php

    $markup .= '<div class="card">';
    $markup .= '<div class="card-body">';
    $markup .= '<div class="my-3 align-items-center">';
    // this inline style can be removed next time we apply a new Styleguide version 
    $markup .= '<img style="height:8rem;" class="img-fluid rounded-circle mb-2 person-card-avatar" src="' . esc_url($photo_url) . '" alt="' . esc_attr($person->prenom) . ' ' . esc_attr($person->nom) . '">';
    $markup .= '</div>';
    $markup .= '<h3><a class="link-pretty" href="' . esc_url($people_url) . '">' . esc_html($person->prenom) . ' ' . esc_html($person->nom) . '</a></h3>';
    $markup .= '<dl class="definition-list definition-list-grid mb-0">';      

    if ($function) {
        $markup .= '<dt>' . __('Position', 'epfl') . '</dt>';
        $markup .= '<dd>' . esc_html($function) . '</dd>';
    } else {
        // Quickfix until fixed in Styleguide 
        $markup .= '<dt></dt>';
        $markup .= '<dd>&nbsp;</dd>';
    }
    if ($room) {                
        $markup .= '<dt>' . __('Office', 'epfl') . '</dt>';
        $markup .= '<dd><a class="link-pretty" href="' . esc_url($room_url) . '">' . esc_html($room) . '</a></dd>';
    } else {
        // Quickfix until fixed in Styleguide 
        $markup .= '<dt></dt>';
        $markup .= '<dd>&nbsp;</dd>';
    }

    $markup .= '</dl>';
    $markup .= '<div class="w-100 mt-2 mt-md-0">';
    if ($person->email) {
        $markup .= '<a class="btn btn-block btn-primary mb-2" href="mailto:' . esc_attr($person->email) . '">' . esc_html($person->email) . '</a>';
    }
    if (isset($phones[0])) {
        $markup .= '<a class="btn btn-block btn-secondary" href="tel:+412169' . esc_html($phones[0]) . '">' . esc_html($phones[0]) . '</a>';
    }
    $markup .= '</div>';
    $markup .= '</div>';
    $markup .= '</div>';
    if($index % $columns == 0) {
        $markup .= '</div">';
    }