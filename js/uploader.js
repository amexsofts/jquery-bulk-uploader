/**
 * Created by amanu on 7/30/15.
 *
 * Each uploader will be a table,
 * each row will represent an image upload task
 * each task can be saved, or deleted
 * after image is uploaded, image some id is received, and after
 *
 * Needed Components,
 *  a table,
 *  a row
 *  a data for additional columns
 *
 */
(function ($) {

    window.UploaderConfig = {
        max: 4,
        placeHolder: "../images/placeholder",
        addButtonClass: 'btn btn-sm btn-success uploader-add',
        addButtonText: '<i class="fa fa-plus"></i> Add',
        saveAllButtonClass: 'btn btn-sm btn-primary',
        saveAllButtonText: '<i class="fa fa-save"></i>',
        removeAllButtonClass: 'btn btn-sm btn-danger',
        removeAllButtonText: '<i class="fa fa-remove"></i>',
        saveButtonClass: '<a class="btn btn-sm btn-primary uploader-save"  href="javascript:void(0)">',
        saveButtonText: '<i class="fa fa-save"></i></a>',
        removeButtonClass: 'btn btn-sm btn-danger',
        removeButtonText: '<i class="fa fa-remove"></i>',
        uploaderClass: 'table',
        commandRowClass: '',
        imageRowClass: '',
        imageContainerClass: '',
        loadingImage: '<i class="fa fa-spin fa-spinner fa-3x"></i>',
        imageClass: 'img-responsive img-thumbnail',
        inputContainerClass: 'input-group input-group-sm',
        textInputClass: 'input-sm',
        numberInputClass: 'input-sm',
        fileInputClass: '',
        longTextInputClass: '',
        set: function (settings) {
        }
    };


}(jQuery));

