function importFile(paths){
    paths = Array.isArray(paths) ? paths : [paths];
    let promises = [];
    paths.forEach((src)=>{
        promises.push(new Promise((resolve, reject)=>{
            switch(getExtension(src)){
                case 'js':
                    let script = document.createElement('script');
                    script.src = src;
                    script.onload = resolve;
                    document.head.appendChild(script);
                    break;
                case 'css':
                    let link = document.createElement('link');
                    link.rel = 'stylesheet';
                    link.href = src;
                    link.onload = resolve;
                    document.head.appendChild(link);
                    break;
            }
        }));
    });
    return Promise.all(promises);
}

function getExtension(path){
    return path.substr(path.lastIndexOf('.') + 1);
}