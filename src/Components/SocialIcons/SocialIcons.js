import React from 'react';
import "./SocialIcons.css"
import IconWithGreyBack from '../IconWithGreyBack/IconWithGreyBack';
function SocialIcons(props) {
    return (
        <div id = "Social_Icons">
            <IconWithGreyBack IconName = {"foundation_mail.svg"}></IconWithGreyBack>
            <IconWithGreyBack IconName = {"typcn_social-instagram.svg"}></IconWithGreyBack>
            <IconWithGreyBack IconName = {"typcn_social-facebook.svg"}></IconWithGreyBack>
        </div>
    );
}

export default SocialIcons;