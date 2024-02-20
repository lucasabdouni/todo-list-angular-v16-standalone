import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FontWeightResizerDirective } from '../../fontWeightResizer.directive';
import { TesteFontWeightResizerDirectiveComponent } from './testFontWeightResizerDirective.component';

describe('TestFontWeightResizerDirective', () => {
  let fixture: ComponentFixture<TesteFontWeightResizerDirectiveComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        TesteFontWeightResizerDirectiveComponent,
        FontWeightResizerDirective,
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    });
    fixture = TestBed.createComponent(TesteFontWeightResizerDirectiveComponent);
    fixture.detectChanges();
  });

  it("should font-weight to be 'bold'", () => {
    const h2: HTMLElement = fixture.nativeElement.querySelector('h2');
    const fontWeight = h2.style.fontWeight;

    console.log('aqui o css', h2);

    expect(fontWeight).toEqual('bold');
  });
});
