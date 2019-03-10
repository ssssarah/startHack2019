''' Config Proto '''

import sys
import os


####### INPUT OUTPUT #######

# The name of the current model for output
name = 'faceres_ms'

# The folder to save log and model
log_base_dir = './log/'

# The interval between writing summary
summary_interval = 100

# Training dataset path
train_dataset_path = '/path/to/training/dataset/folder'

# Test dataset path
test_dataset_path = '/path/to/training/dataset/folder'

# LFW standard protocol file
lfw_pairs_file = './proto/lfw_pairs.txt'

# Target image size for the input of network
image_size = [96, 112]

# 3 channels means RGB, 1 channel for grayscale
channels = 3

# Preprocess for training
preprocess_train = [
    # ['resize', (48,56)],
    # ['resize', (96,112)],
    ['random_flip'],
    # ['random_crop', (112,112)],
    # ['random_downsample', 0.5],
    ['standardize', 'mean_scale'],
]

# Preprocess for testing
preprocess_test = [
    # ['resize', (96,112)],
    # ['center_crop', (112, 112)],
    ['standardize', 'mean_scale'],
]

# Number of GPUs
num_gpus = 4


####### NETWORK #######

# Use sibling network
use_sibling = False

# The network architecture
network = "nets/face_resnet.py"

# Model version, only for some networks
model_version = None

# Number of dimensions in the embedding space
embedding_size = 512


####### TRAINING STRATEGY #######

# Optimizer
optimizer = "MOM"

# Number of samples per batch
batch_size = 256

# Structure of batch, use one of following:
# random_sample, random_pair, random_AB_pair
batch_format = 'random_sample'

# Number of batches per epoch
epoch_size = 1000

# Number of epochs
num_epochs = 320

# learning rate strategy
learning_rate_strategy = 'step'

# learning rate schedule
learning_rate_schedule = {
    0:      0.1,
    160000:  0.01,
    240000:  0.001,
    280000:  0.0001,
}

# Multiply the learning rate for variables that contain certain keywords
learning_rate_multipliers = {
}

# Restore model
restore_model = '/path/to/training/dataset/folder'

# Keywords to filter restore variables, set None for all
restore_scopes = ['FaceResNet']


# Weight decay for model variables
weight_decay = 5e-4

# Keep probability for dropouts
keep_prob = 1.0



####### LOSS FUNCTION #######

# Loss functions and their parameters
losses = {
    'am': {'scale': 'auto', 'm': 5.0}
}

