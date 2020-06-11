import { useState, useEffect, useCallback } from 'react';

import classnames from 'classnames';

import styles from '../styles/components/post-banner.scss';

const PostBanner = ({
  title, createdAt, description, thumbnail,
  titleClassName, keepLineActive,
}) => {
  const [imageEnabled, setImageEnabled] = useState(false);
  useEffect(() => {
    if (thumbnail) {
      setImageEnabled(true);
    }
  }, []);

  const [imageLoaded, setImageLoaded] = useState(false);
  const onImageLoaded = useCallback(() => {
    setImageLoaded(true);
  }, []);

  return (
    <div
      className={
        classnames(styles.postBanner, 'relative max-w-screen-lg mx-auto m-5')
      }
    >
      { imageEnabled && (
        <img
          src={thumbnail}
          className={classnames(styles.thumbnail, { [styles.loaded]: imageLoaded })}
          onLoad={onImageLoaded}
        />
      ) }
      <div
        className={
          classnames(
            styles.content, 'p-5',
            { 'pt-32': !!thumbnail, [styles.thumbnailLoaded]: imageLoaded }
          )
        }
      >
        <h1 className={
          classnames(
            styles.title, 'font-bold my-3', titleClassName,
            { [styles.keepLineActive]: keepLineActive }
          )
        }>
          { title }
        </h1>
        <p>{ createdAt }</p>
        { description && (
          <p className='text-lg my-1'>{ description }</p>
        ) }
      </div>
    </div>
  );
};

export default PostBanner;
