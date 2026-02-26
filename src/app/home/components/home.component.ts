import { CdkDrag } from '@angular/cdk/drag-drop';
import { NgOptimizedImage } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, signal, WritableSignal } from '@angular/core';
import { Router } from '@angular/router';
import { CaptchaService } from '../services/captcha.service';


@Component({
    selector: 'app-home',
    imports: [
        NgOptimizedImage,
        CdkDrag,
    ],
    templateUrl: './home.component.html',
    styleUrl: './home.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class HomeComponent {
    private router: Router = inject(Router);
    private captchaService: CaptchaService = inject(CaptchaService);

    public squarePosition: WritableSignal<{ x: number; y: number }> = signal({ x: 0, y: 0 });
    public cylinderPosition: WritableSignal<{ x: number; y: number }> = signal({ x: 0, y: 0 });
    public trianglePosition: WritableSignal<{ x: number; y: number }> = signal({ x: 0, y: 0 });

    public squareDropInAnimation: WritableSignal<boolean> = signal(false);
    public cylinderDropInAnimation: WritableSignal<boolean> = signal(false);
    public triangleDropInAnimation: WritableSignal<boolean> = signal(false);

    public loadingSignal: WritableSignal<boolean> = signal(false);
    public errorSignal: WritableSignal<boolean> = signal<boolean>(false);

    private readonly squareTarget: WritableSignal<{ x: number; y: number }> = signal({ x: 109, y: 187 });
    private readonly cylinderTarget: WritableSignal<{ x: number; y: number }> = signal({ x: -104, y: 187 });
    private readonly triangleTarget: WritableSignal<{ x: number; y: number }> = signal({ x: 49, y: 187 });
    private readonly alternativeCylinderTarget: WritableSignal<{ x: number; y: number }> = signal({ x: 49, y: 187 });
    private readonly alternativeTriangleTarget: WritableSignal<{ x: number; y: number }> = signal({ x: -10, y: 187 });
    private readonly positionTolerance: WritableSignal<number> = signal(10);

    public resetClick() {
        this.resetElements();
        this.resetPositions();
    }

    public onSquareDragEnded(event: { source: { getFreeDragPosition: () => { x: number; y: number } } }): void {
        const pos: { x: number; y: number } = event.source.getFreeDragPosition();
        if (this.isWithinTarget(pos, this.squareTarget(), this.positionTolerance())) {
            this.squarePosition.set({ ...this.squareTarget() });
            this.squareDropInAnimation.set(true);
        } else {
            this.squarePosition.set({ x: pos.x, y: pos.y });
        }
    }

    public onCylinderDragEnded(event: { source: { getFreeDragPosition: () => { x: number; y: number } } }): void {
        const pos: { x: number; y: number } = event.source.getFreeDragPosition();
        if (this.isWithinTarget(pos, this.cylinderTarget(), this.positionTolerance())) {
            this.cylinderPosition.set({ ...this.cylinderTarget() });
            this.cylinderDropInAnimation.set(true);
        } else if (this.isWithinTarget(pos, this.alternativeCylinderTarget(), this.positionTolerance())) {
            this.cylinderPosition.set({ ...this.alternativeCylinderTarget() });
            this.cylinderDropInAnimation.set(true);
        } else {
            this.cylinderPosition.set({ x: pos.x, y: pos.y });
        }
    }

    public onTriangleDragEnded(event: { source: { getFreeDragPosition: () => { x: number; y: number } } }): void {
        const pos: { x: number; y: number } = event.source.getFreeDragPosition();
        if (this.isWithinTarget(pos, this.triangleTarget(), this.positionTolerance())) {
            this.trianglePosition.set({ ...this.triangleTarget() });
            this.triangleDropInAnimation.set(true);
        } else if (this.isWithinTarget(pos, this.alternativeTriangleTarget(), this.positionTolerance())) {
            this.trianglePosition.set({ ...this.alternativeTriangleTarget() });
            this.triangleDropInAnimation.set(true);
        } else {
            this.trianglePosition.set({ x: pos.x, y: pos.y });
        }
    }

    public verifyClick(): void {
        this.loadingSignal.set(true);
        this.resetElements();

        setTimeout(() => {
            const squareOk: boolean = this.isWithinTarget(this.squarePosition(), this.squareTarget(), this.positionTolerance());
            const cylinderOk: boolean = this.isWithinTarget(this.cylinderPosition(), this.cylinderTarget(), this.positionTolerance());
            const triangleOk: boolean = this.isWithinTarget(this.trianglePosition(), this.triangleTarget(), this.positionTolerance());

            if (squareOk && cylinderOk && triangleOk) {
                this.captchaService.setCaptchaCompleted(true);
                this.router.navigate(['dashboard']);
            } else {
                this.errorSignal.set(true);
                this.resetPositions();
            }
            this.loadingSignal.set(false);
        }, 2000);
    }

    private resetElements(): void {
        this.errorSignal.set(false);
        this.squareDropInAnimation.set(false);
        this.cylinderDropInAnimation.set(false);
        this.triangleDropInAnimation.set(false);
    }

    private resetPositions(): void {
        this.squarePosition.set({ x: 0, y: 0 });
        this.cylinderPosition.set({ x: 0, y: 0 });
        this.trianglePosition.set({ x: 0, y: 0 });
    }

    private isWithinTarget(
        pos: { x: number; y: number },
        target: { x: number; y: number },
        tolerance: number,
    ): boolean {
        return Math.abs(pos.x - target.x) <= tolerance && Math.abs(pos.y - target.y) <= tolerance;
    }
}
