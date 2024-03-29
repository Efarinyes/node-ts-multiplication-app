// import yargs from "yargs";

const runCommand = async ( args: string[] ) => {
    process.argv = [...process.argv, ...args ]
    
    const { yarg } = await import('./args.plugin')
    return yarg
}

describe('Test args.plugin.ts', () => {

    const originalArgv = process.argv;

    beforeEach(() => {
      process.argv = originalArgv;
      jest.resetModules();
    });

    test('should return default values', async() => {
        
       const argv =  await runCommand(['-b', '5'])
       // console.log(argv)
       expect(argv).toEqual( expect.objectContaining(
        {
            b: 5,
            l: 10,
            s: true,
            n: 'multiplication-table',
            d: 'outputs',
           })
       );

    });

    test('Should return with custom values', async () => {
        
        const argv = await runCommand(['-b', '8', '-l', '20', '-s', '-n', 'custom-name', '-d', 'custom-dir']);
        // console.log(argv)
        expect(argv).toEqual(expect.objectContaining({
            b: 8,
            l: 20,
            s: true,
            n: 'custom-name',
            d: 'custom-dir',
          }));
    }) 
});