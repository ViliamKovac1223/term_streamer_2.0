/** 
    @typedef {{
        files?: string[],
        directories?: string[],
        directoryPath: string,
        previousDirectory?: string
    }} DirectoryDetailsDTO */
export { };

/** 
    @typedef {{
        file?: string,
        directory?: string
    }} FileDetails */
export { };

/**
    @typedef {{
        src: string,
        type: string
    }} VideoJsSources */
export { };

/**
    @typedef {{
        autoplay: boolean,
        controls: boolean,
        class: string,
        fluid: boolean,
        sources: VideoJsSources
    }} VideoJsOptions */
export { };

/**
 * @typedef {Object} VideoJsProps
 * @property {VideoJsOptions} options - Options for videoJS
 * @property {boolean} onReady - The second object
 */
export { };
