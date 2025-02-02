import { Flex } from '@chakra-ui/react';
import { useState } from 'react';

const Actions = () => {
    const [liked,setLiked] = useState(false)
  return (
    <Flex gap={3} my={2} onClick={(e) => e.preventDefault()}>
      {/* Like Icon */}
      <svg
        aria-label="Like"
        color={liked ? "rgb(237, 73, 86)" : ""}
        fill={liked ? "rgb(237, 73, 86)" : "transparent"}
        height="19"
        role="img"
        viewBox="0 0 24 22"
        width="20"
        onClick={() => setLiked(!liked)}
      >
        <path
          d="M1 7.66c0 4.575 3.899 9.086 9.987 12.934.338.203.74.406 1.013.406.283 0 .686-.203 1.013-.406C19.1 16.746 23 12.234 23 7.66 23 3.736 20.245 1 16.672 1 14.603 1 12.98 1.94 12 3.352 11.042 1.952 9.408 1 7.328 1 3.766 1 1 3.736 1 7.66Z"
          stroke="currentColor"
          strokeWidth="2"
        ></path>
      </svg>

      {/* Comment Icon */}
      <svg
        aria-label="Comment"
        color=""
        fill=""
        height="20"
        role="img"
        viewBox="0 0 24 24"
        width="20"
      >
        <title>Comment</title>
        <path
          d="M20.656 17.008a9.993 9.993 0 1 0-3.59 3.615L22 22Z"
          fill="none"
          stroke="currentColor"
          strokeLinejoin="round"
          strokeWidth="2"
        ></path>
      </svg>

      {/* New Repost Icon */}
      <svg
        aria-label="Repost"
        height="20"
        role="img"
        viewBox="0 0 24 24"
        width="20"
      >
        <path
          d="M6 9v3H3V3h6v3H6zM12 3v6h6v6H9v3h12V0H12z"
          fill="currentColor"
        />
      </svg>

      {/* New Share Icon */}
      <svg
        aria-label="Share"
        height="20"
        role="img"
        viewBox="0 0 24 24"
        width="20"
      >
        <path
          d="M16.59 8.59L15.17 7l-4.59 4.59V4h-2v8.17L8.83 11 7.41 12.41 12 17l5.59-5.59z"
          fill="currentColor"
        />
      </svg>
    </Flex>
  );
};

export default Actions;
