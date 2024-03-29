import React from 'react';
import {Avatar, AvatarGroup} from "@nextui-org/react";

import {useRecoilValue} from "recoil";
import {currentClubMembershipInfoState} from "../../../recoil/hooks/UseMembershipApi";

const AvatarArea = () => {

    const memberships = useRecoilValue(currentClubMembershipInfoState).summaryList;

    return (
        <AvatarGroup isBordered color='black'  max={6}>
            {memberships.filter(member => member.status !== 'PENDING').map((member, index) => (
                <Avatar key={member.userId}
                        showFallback
                        aria-label={member.userName}
                        src={member.userProfile ? `https://ffkv1pqc2354.edge.naverncp.com/p5Rq2SwoqV/user-profile/${member.userProfile}?type=f&w=600&h=600&ttype=jpg` : ''}
                        size='lg' radius="lg" />
            ))}
        </AvatarGroup>
    );
};

export default AvatarArea;
