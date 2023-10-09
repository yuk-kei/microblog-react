import { useState, useEffect } from "react";
import Image from 'react-bootstrap/Image';
import { useParams } from "react-router-dom";
import Body from "../components/Body";
import TimeAgo from "../components/TimeAgo";
import { Spinner, Stack } from "react-bootstrap";
import { useApi } from "../contexts/ApiProvider";
import Posts from "../components/Posts"


export default function UserPage() {
    const { username } = useParams();
    const [user, setUser] = useState();
    const api = useApi();

    useEffect(() => {
        (async () => {
            const response = await api.get('/users/' + username);
            setUser(response.ok ? response.body : null);
        })();
    }, [api, username]);

    return (
        <Body sidebar>
            {user === undefined ?
                <Spinner animation="border"/>
            :
                <>
                    {user === null ?
                        <p>User not found.</p>
                    :
                        <>
                            <Stack direction="horizontal" gap={4}>
                                <Image src={user.avatar_url + '&s=128'}  roundCircle />
                                <div>
                                    <h1>{user.username}</h1>
                                    {user.about_me && <h5>{user.about_me}</h5>}
                                    <p>
                                        Member since: <TimeAgo isoDate={user.first_seen} />
                                        <br/> 
                                        Last seen: <TimeAgo isoDate={user.last_seen} />
                                    </p>
                                </div>

                            </Stack>
                            <Posts content={user.id} />
                        </>
                    }
                </>
            }
        </Body>
    );
}    