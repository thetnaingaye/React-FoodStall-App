import React, { Component } from 'react';
import { Storage } from 'aws-amplify';
import ReactLoading from 'react-loading';
import { withRouter } from "react-router-dom";



class S3FileUpload extends Component {

    constructor(props) {
        super(props);
        this.state = {
            uploadFile: null,
            s3Link: "",
            submitting: false,
            hasInvoice: this.props.hasInvoice

        }
    }

    onChange = (e) => {
        const file = e.target.files[0];

        if (file) {
            console.log(file);
            console.log("file name :" + file.name)
            console.log("file type : " + file.type)
            console.log("file ext :" + file.name.split('.').pop());
            this.setState({
                uploadFile: file,
            })
        }
    }

    clearFile = (e) => {
        e.preventDefault();
        this.fileInput.value = "";
        this.setState({
            s3Link: ""
        })
    }

    uploadToS3 = (e) => {
        e.preventDefault();
        if (this.state.uploadFile) {
            const file = this.state.uploadFile;  // file object from input
            const fileExt = file.name.split('.').pop();  // split by '.' get last element which is extension
            const fileType = file.type;  // content-type

            this.setState({
                submitting: true,
                uploadedFileId: this.props.orderid
            })
            console.log("uploading to s3..." + this.state.uploadFile.name)
            Storage.put(`${this.props.orderid}.${fileExt}`, file, {
                contentType: fileType
            })
                .then(result => {
                    console.log("file uploaded: " + JSON.stringify(result));

                    this.fileInput.value = "";
                    this.setState({
                        uploadFile: null,
                        submitting: false
                    })
                    // get file from S3
                    Storage.get(result.key)
                        .then(result => {
                            console.log("Got File from S3 :" + result)
                            alert('File has successfully uploaded to aws S3')
                            this.props.reload();
                        })
                        .catch(err => alert('File upload error'));
                })
                .catch(err => console.log(err));
        }
    }

    downloadInvoice = (e) => {

        e.preventDefault();

        // get file from S3 , current for pdf
        Storage.get(`${this.props.orderid}.pdf`)
            .then(result => {
                fetch(result)
                    .then(res => {
                        console.log(res.status)
                        if (res.status !== 404) {

                            console.log("Got File from S3 :" + result)
                            window.open(result, "_blank");
                        } else {
                            alert("file not found")
                        }
                    })
                    .catch(err => console.log(err))


            })
            .catch(err => {
                alert("error in downloading:")
                console.log(err)
            });


    }

    deleteInvoice = (e) => {
        e.preventDefault();
        Storage.remove(`${this.props.orderid}.pdf`)
            .then(result => {
                console.log(result)
                alert('File has successfully deleted from aws S3')

                this.props.reload();

            })
            .catch(err => console.log(err));
    }
   
    render() {
        const id = this.props.orderid !== " " ? this.props.orderid : "none";

        return (
            <div>
                {this.state.submitting && <div><p>Uploading to AWS S3...</p>
                    <ReactLoading type="bubbles" color="peru" height={100} width={100} />
                </div>}

                <div style={!this.state.submitting ? {} : { display: 'none' }}>
                    <form onSubmit={this.uploadToS3}>
                        <div className="form-group">
                            Upload Invoice for order id :
                            <label style={{ color: "peru" }} htmlFor="fileinput">{id}</label>

                            <input type="file" className="form-control" id="fileinput"
                                accept="application/pdf,application/vnd.openxmlformats-officedocument.wordprocessingml.document,application/msword,application/zip"
                                onChange={this.onChange} ref={ref => this.fileInput = ref} />
                            <br />
                            <input className="btn btn-success" type="submit" value="upload" />
                            <button className="btn btn-info" style={{ marginLeft: '10px' }} onClick={this.clearFile} >Clear</button>
                            {this.props.hasInvoice && <button className="btn btn-danger" style={{ marginLeft: '10px' }} onClick={this.downloadInvoice} > Download</button>}
                            {this.props.hasInvoice && <button className="btn btn-primary" style={{ marginLeft: '10px' }} onClick={this.deleteInvoice}  > Delete</button>}
                        </div>
                    </form>
                </div>

            </div>
        )
    }
}

export default withRouter(S3FileUpload);