import { expect } from 'chai';
import sinon from 'sinon';
import { walk } from '../../src/amble.js';

describe('amble', () => {
    it('should walk a rule', () => {
        const spy = sinon.spy();

        const css = `
            div {
                color: red;
            }
        `;

        walk(css, spy);

        expect(spy.callCount).to.equal(3);

        expect(spy.args[0][0]).to.equal('div');
        expect(spy.args[0][1]).to.equal('{');

        expect(spy.args[1][0]).to.equal('color:red');
        expect(spy.args[1][1]).to.equal(';');

        expect(spy.args[2][0]).to.equal('');
        expect(spy.args[2][1]).to.equal('}');
    });

    it('should walk a rule with multiple declarations', () => {
        const spy = sinon.spy();

        const css = `
            span {
                display: block;
                width: 100px;
                height: 200px;
            }
        `;

        walk(css, spy);

        expect(spy.callCount).to.equal(5);

        expect(spy.args[0][0]).to.equal('span');
        expect(spy.args[0][1]).to.equal('{');

        expect(spy.args[1][0]).to.equal('display:block');
        expect(spy.args[1][1]).to.equal(';');

        expect(spy.args[2][0]).to.equal('width:100px');
        expect(spy.args[2][1]).to.equal(';');

        expect(spy.args[3][0]).to.equal('height:200px');
        expect(spy.args[3][1]).to.equal(';');

        expect(spy.args[4][0]).to.equal('');
        expect(spy.args[4][1]).to.equal('}');
    });

    it('should walk multiple rules', () => {
        const spy = sinon.spy();

        const css = `
            .foo {
                width: 100px;
                height: 200px;
            }

            .bar {
                color: white;
                background-color: black;
            }
        `;

        walk(css, spy);

        expect(spy.callCount).to.equal(8);

        expect(spy.args[0][0]).to.equal('.foo');
        expect(spy.args[0][1]).to.equal('{');

        expect(spy.args[1][0]).to.equal('width:100px');
        expect(spy.args[1][1]).to.equal(';');

        expect(spy.args[2][0]).to.equal('height:200px');
        expect(spy.args[2][1]).to.equal(';');

        expect(spy.args[3][0]).to.equal('');
        expect(spy.args[3][1]).to.equal('}');

        expect(spy.args[4][0]).to.equal('.bar');
        expect(spy.args[4][1]).to.equal('{');

        expect(spy.args[5][0]).to.equal('color:white');
        expect(spy.args[5][1]).to.equal(';');

        expect(spy.args[6][0]).to.equal('background-color:black');
        expect(spy.args[6][1]).to.equal(';');

        expect(spy.args[7][0]).to.equal('');
        expect(spy.args[7][1]).to.equal('}');
    });

    it('should walk an at-rule', () => {
        const spy = sinon.spy();

        const css = `
            @media screen and (max-width: 480px) {
                [attr=value] {
                    color: red;
                }
            }
        `;

        walk(css, spy);

        expect(spy.callCount).to.equal(5);

        expect(spy.args[0][0]).to.equal('@media screen and (max-width:480px)');
        expect(spy.args[0][1]).to.equal('{');

        expect(spy.args[1][0]).to.equal('[attr=value]');
        expect(spy.args[1][1]).to.equal('{');

        expect(spy.args[2][0]).to.equal('color:red');
        expect(spy.args[2][1]).to.equal(';');

        expect(spy.args[3][0]).to.equal('');
        expect(spy.args[3][1]).to.equal('}');

        expect(spy.args[4][0]).to.equal('');
        expect(spy.args[4][1]).to.equal('}');
    });

    it('should walk multiple at-rules', () => {
        const spy = sinon.spy();

        const css = `
            @keyframes foo {
                from {
                    top: 0;
                }
                to {
                    top: 100px;
                }
            }

            @media only screen 
              and (min-width: 320px) 
              and (max-width: 480px)
              and (resolution: 150dpi) {
                :nth-child(even) {
                    color: blue;
                }
            }
        `;

        walk(css, spy);

        expect(spy.callCount).to.equal(13);

        expect(spy.args[0][0]).to.equal('@keyframes foo');
        expect(spy.args[0][1]).to.equal('{');

        expect(spy.args[1][0]).to.equal('from');
        expect(spy.args[1][1]).to.equal('{');

        expect(spy.args[2][0]).to.equal('top:0');
        expect(spy.args[2][1]).to.equal(';');

        expect(spy.args[3][0]).to.equal('');
        expect(spy.args[3][1]).to.equal('}');

        expect(spy.args[4][0]).to.equal('to');
        expect(spy.args[4][1]).to.equal('{');

        expect(spy.args[5][0]).to.equal('top:100px');
        expect(spy.args[5][1]).to.equal(';');

        expect(spy.args[6][0]).to.equal('');
        expect(spy.args[6][1]).to.equal('}');

        expect(spy.args[7][0]).to.equal('');
        expect(spy.args[7][1]).to.equal('}');

        expect(spy.args[8][0]).to.equal('@media only screen and (min-width:320px) and (max-width:480px) and (resolution:150dpi)');
        expect(spy.args[8][1]).to.equal('{');

        expect(spy.args[9][0]).to.equal(':nth-child(even)');
        expect(spy.args[9][1]).to.equal('{');

        expect(spy.args[10][0]).to.equal('color:blue');
        expect(spy.args[10][1]).to.equal(';');

        expect(spy.args[11][0]).to.equal('');
        expect(spy.args[11][1]).to.equal('}');

        expect(spy.args[12][0]).to.equal('');
        expect(spy.args[12][1]).to.equal('}');
    });

    it('should ignore comments', () => {
        const spy = sinon.spy();

        const css = `
            /**
             * Donec convallis dictum felis eget ultricies. Quisque at nulla lacinia, bibendum diam. 
             * Quisque non enim pretium, interdum nisl quis, lacinia libero. In eu odio.
             */
            div {
                color: red; /* foo */
            }
        `;

        walk(css, spy);

        expect(spy.callCount).to.equal(3);

        expect(spy.args[0][0]).to.equal('div');
        expect(spy.args[0][1]).to.equal('{');

        expect(spy.args[1][0]).to.equal('color:red');
        expect(spy.args[1][1]).to.equal(';');

        expect(spy.args[2][0]).to.equal('');
        expect(spy.args[2][1]).to.equal('}');
    });

    it('should support mal-formed css', () => {
        const spy = sinon.spy();
        
        const css = `
            div, 
            #foo ,     .bar.baz,[attr],
            :pseudo {       color: 
                    red;
            };
        `;

        walk(css, spy);

        expect(spy.callCount).to.equal(3);

        expect(spy.args[0][0]).to.equal('div, #foo , .bar.baz,[attr],:pseudo');
        expect(spy.args[0][1]).to.equal('{');

        expect(spy.args[1][0]).to.equal('color:red');
        expect(spy.args[1][1]).to.equal(';');

        expect(spy.args[2][0]).to.equal('');
        expect(spy.args[2][1]).to.equal('}');
    });

    it('should support complex selectors', () => {
        const spy = sinon.spy();
        
        const css = `
            #foo > [attr=val]:empty + div.foo.bar,
            :not(span[attr]:contains("foo"))::before {
                color: red;
            }
        `;

        walk(css, spy);

        expect(spy.callCount).to.equal(3);

        expect(spy.args[0][0]).to.equal('#foo > [attr=val]:empty + div.foo.bar,:not(span[attr]:contains("foo"))::before');
        expect(spy.args[0][1]).to.equal('{');

        expect(spy.args[1][0]).to.equal('color:red');
        expect(spy.args[1][1]).to.equal(';');

        expect(spy.args[2][0]).to.equal('');
        expect(spy.args[2][1]).to.equal('}');
    });

    it('should support complex declarations', () => {
        const spy = sinon.spy();
        
        const css = `
            div {
                --main-bg-color: brown;
                background-color: var(--main-bg-color, hsla(30, 100%, 50%, .3));
                transition: color .3s linear 1s, background .2s ease-in 1s, opacity .3s;
                background-image: url("foo.jpg"), url('bar.jpg'), url("baz.jpg");
                font-family: Times, "Times New Roman", serif;
                width: calc(30% * 20em - 2vh / 2pt);
                box-shadow: inset 0 0 10px rgba(0,0,0,.5) !important;
                transform: rotate(-45deg) skew(20deg, 40deg) scale(2);
            }
        `;

        walk(css, spy);

        expect(spy.callCount).to.equal(10);

        expect(spy.args[0][0]).to.equal('div');
        expect(spy.args[0][1]).to.equal('{');

        expect(spy.args[1][0]).to.equal('--main-bg-color:brown');
        expect(spy.args[1][1]).to.equal(';');

        expect(spy.args[2][0]).to.equal('background-color:var(--main-bg-color, hsla(30, 100%, 50%, .3))');
        expect(spy.args[2][1]).to.equal(';');

        expect(spy.args[3][0]).to.equal('transition:color .3s linear 1s, background .2s ease-in 1s, opacity .3s');
        expect(spy.args[3][1]).to.equal(';');

        expect(spy.args[4][0]).to.equal(`background-image:url("foo.jpg"), url('bar.jpg'), url("baz.jpg")`); // eslint-disable-line quotes
        expect(spy.args[4][1]).to.equal(';');

        expect(spy.args[5][0]).to.equal('font-family:Times, "Times New Roman", serif');
        expect(spy.args[5][1]).to.equal(';');

        expect(spy.args[6][0]).to.equal('width:calc(30% * 20em - 2vh / 2pt)');
        expect(spy.args[6][1]).to.equal(';');

        expect(spy.args[7][0]).to.equal('box-shadow:inset 0 0 10px rgba(0,0,0,.5) !important');
        expect(spy.args[7][1]).to.equal(';');

        expect(spy.args[8][0]).to.equal('transform:rotate(-45deg) skew(20deg, 40deg) scale(2)');
        expect(spy.args[8][1]).to.equal(';');

        expect(spy.args[9][0]).to.equal('');
        expect(spy.args[9][1]).to.equal('}');
    });
});
