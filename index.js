const cache = require('@actions/cache');
const core = require('@actions/core');
const { promisify } = require('util');
const exec = promisify(require('child_process').exec)

async function latestCacheKey()
{
    return (await exec(String.raw`bash -c "curl https://jwakely.github.io/pkg-gcc-latest/ | grep gcc-latest_ | sed 's/.*>\(gcc-latest_.*\).deb<.*/\1/'"`)).stdout.trim();
}

const paths = ['/opt/gcc-latest/'];

async function restoreCache()
{
    const key = await latestCacheKey();
    return [ (await cache.restoreCache(paths, key, Array()) !== undefined), key ];
}

async function setUpPackage()
{
    exec('bash -c "wget http://kayari.org/gcc-latest/gcc-latest.deb && sudo dpkg -i gcc-latest.deb && rm gcc-latest.deb"',
         { cwd: process.env.RUNNER_TEMP });
}

function saveCache(key)
{
    cache.saveCache(paths, key);
}

function setUpEnvironment()
{
    core.addPath('/opt/gcc-latest/bin');
    core.exportVariable('LD_RUN_PATH', '/opt/gcc-latest/lib64');
}

async function run()
{
    try {
        if (core.getInput('cache'))
        {
            const [ restored, key ] = await restoreCache();
            if (!restored)
            {
                await setUpPackage();
                saveCache(key);
            }
        }
        else
        {
            await setUpPackage();
        }
        setUpEnvironment();
    }
    catch (error)
    {
        core.setFailed(error.message);
    }
}

run();
