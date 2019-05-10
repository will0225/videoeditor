import React, { Component } from 'react';
import Dropzone from 'react-dropzone-uploader';

export default class Uploader extends Component {

	constructor(props) {
		super(props);
		this.handleChangeStatus = this.handleChangeStatus.bind(this);
		this.getUploadParams = this.getUploadParams.bind(this);
	}

	getUploadParams() {
		return { url: `/api/project/${this.props.value.project}/file` };
	}

	handleChangeStatus({ meta, xhr, remove }, status) {
		if (status === 'done') {
			console.log(`${meta.name} uploaded!`);
			const response = JSON.parse(xhr.response);
			this.props.value.onAdd({
				id: response.resource_id,
				name: meta.name,
				duration: response.length,
				mime: response.resource_mime,
			});
			remove();
		} else if (status === 'aborted') {
			console.log(`${meta.name}, upload failed...`);
		}
	}

	render () {
		return (
			<Dropzone
				getUploadParams={this.getUploadParams}
				onChangeStatus={this.handleChangeStatus}
				accept="image/*,audio/*,video/*"
				inputContent={(files, extra) => (extra.reject ? 'Nahrávat lze pouze video, audio a obrázkové soubory.' : 'Nahrát soubory')}
				inputWithFilesContent={'Nahrát soubory'}
				styles={{
					dropzoneReject: { borderColor: '#7a281b', backgroundColor: '#DAA' },
				}}
			/>
		);
	}
}
